import React from "react"
import { useStaticQuery, graphql, Link as GatsbyLink } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "@material-ui/core"

const Blog = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
          edges {
            node {
              title
              id
              slug
              publishedDate(formatString: "Do MMMM, YYYY")
              featuredImage {
                gatsbyImageData(width: 600)
              }
              excerpt {
                childMarkdownRemark {
                  excerpt(pruneLength: 150)
                }
              }
            }
          }
        }
      }
    `
  )
  return (
    <Layout>
      <Seo title="Blog" />
      <Link to="/" color="secondary" component={GatsbyLink}>
        Go back to the homepage
      </Link>
      <ul className="posts">
        {data.allContentfulBlogPost.edges.map(edge => {
          return (
            <li className="post" key={edge.node.id}>
              <h2>
                <Link to={`/blog/${edge.node.slug}/`} component={GatsbyLink}>
                  {edge.node.title}
                </Link>
              </h2>
              <div className="meta">
                <span>Posted on {edge.node.publishedDate}</span>
              </div>
              {edge.node.featuredImage && (
                <GatsbyImage
                  image={getImage(edge.node.featuredImage)}
                  className="featured"
                  alt={edge.node.title}
                />
              )}
              <p className="excerpt">
                {edge.node.excerpt.childMarkdownRemark.excerpt}
              </p>
              <div className="button">
                <Link to={`/blog/${edge.node.slug}/`} component={GatsbyLink}>
                  Read More
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Blog
