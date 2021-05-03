import * as React from "react"
import { Link as GatsbyLink, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Link,
} from "@material-ui/core"

const IndexPage = props => {
  console.log(props)
  return (
    <Layout>
      <Seo title="Home" />
      <Typography variant="h5">
        Welcome to the new blog. Take a look around
      </Typography>
      <Divider />
      {/* <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
    <p>
      <GatsbyLink to="/blog/" style={{ color: "aqua" }}>
        Visit the Blog Page
      </GatsbyLink>
    </p> */}

      {props.data.allContentfulBlogPost.edges.map(edge => {
        return (
          <Box key={edge.node.id} mt={2}>
            <Typography variant="h6" display="inline">
              <Link
                color="secondary"
                to={`/blog/${edge.node.slug}/`}
                component={GatsbyLink}
              >
                {edge.node.title}
              </Link>
            </Typography>

            <Typography variant="subtitle1" display="inline">
              {" "}
              — {edge.node.excerpt.childMarkdownRemark.excerpt}
            </Typography>
            <Typography variant="subtitle2">
              {edge.node.publishedDate}
            </Typography>
          </Box>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
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

export default IndexPage
