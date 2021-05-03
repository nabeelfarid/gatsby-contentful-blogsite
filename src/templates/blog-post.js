import React from "react"
import { graphql, Link as GatsbyLink } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { INLINES, BLOCKS } from "@contentful/rich-text-types"
import { Box, Divider, Link, Typography } from "@material-ui/core"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "Do MMMM, YYYY")
      featuredImage {
        gatsbyImageData(width: 600)
      }
      excerpt {
        excerpt
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
            <iframe
              src={node.data.uri}
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              width="560"
              height="315"
            ></iframe>
          )
        } else
          return (
            <Link href={node.data.uri} target="_blank" rel="noopener">
              {node.content[0].value}
            </Link>
          )
      },
    },
  }
  return (
    <Layout>
      <Seo title={props.data.contentfulBlogPost.title} />
      <Typography variant="h5">
        {props.data.contentfulBlogPost.title}
      </Typography>
      <Typography variant="subtitle2">
        {props.data.contentfulBlogPost.publishedDate}
      </Typography>
      <Divider />
      {props.data.contentfulBlogPost.featuredImage && (
        <Box my={2}>
          <GatsbyImage
            image={getImage(props.data.contentfulBlogPost.featuredImage)}
            alt={props.data.contentfulBlogPost.title}
          />
        </Box>
      )}
      <Typography variant="body1" style={{ fontWeight: "bold" }}>
        {props.data.contentfulBlogPost.excerpt.excerpt}
      </Typography>

      <Typography variant="body1">
        {renderRichText(props.data.contentfulBlogPost.body, options)}
      </Typography>
      {/* <div className="content">
       

        
        // 
      </div> */}
    </Layout>
  )
}

export default BlogPost
