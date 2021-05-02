import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { INLINES, BLOCKS } from "@contentful/rich-text-types"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "Do MMMM, YYYY")
      featuredImage {
        gatsbyImageData(width: 600)
      }
      body {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            title
            fixed {
              src
            }
          }
          gatsbyImageData
        }
      }
    }
  }
`

const BlogPost = props => {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        // const {
        //   fixed: { src },
        //   title,
        // } = node.data.target

        return (
          <>
            {/* <h2>Embedded Asset</h2>
            <pre>
              <code>{JSON.stringify(node, null, 2)}</code>
            </pre>
            <img src={src} alt={title} /> */}
            <GatsbyImage
              image={getImage(node.data.target)}
              alt={node.data.target.title}
            />
          </>
        )
      },
      [INLINES.HYPERLINK]: node => {
        console.log("node", node)
        if (node.data.uri.includes("youtube.com")) {
          return (
            <div style={{ textAlign: "center" }}>
              <iframe
                src={node.data.uri}
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                width="560"
                height="315"
              ></iframe>
            </div>
          )
        } else return <a href={node.data.uri}>{node.content[0].value}</a>
      },
    },
  }
  return (
    <Layout>
      <Seo title={props.data.contentfulBlogPost.title} />
      <Link to="/blog/">Visit the Blog Page</Link>
      <div className="content">
        <h1>{props.data.contentfulBlogPost.title}</h1>
        <span className="meta">
          Posted on {props.data.contentfulBlogPost.publishedDate}
        </span>

        {props.data.contentfulBlogPost.featuredImage && (
          <div className="featured">
            <GatsbyImage
              image={getImage(props.data.contentfulBlogPost.featuredImage)}
              alt={props.data.contentfulBlogPost.title}
            />
          </div>
        )}
        {renderRichText(props.data.contentfulBlogPost.body, options)}
      </div>
    </Layout>
  )
}

export default BlogPost
