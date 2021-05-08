import * as React from "react";
import { Link as GatsbyLink, graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import { Box, Divider, Typography, Link } from "@material-ui/core";

const IndexPage = (props) => {
  return (
    <Layout>
      <Seo title="Home" />
      <Typography variant="h5">
        Welcome to the NEW Blog Site. Take a look around.
      </Typography>
      <Divider />

      {props.data.allContentfulBlogPost.edges.map((edge) => {
        return (
          <Box key={edge.node.id} mt={2}>
            <Typography variant="h6" display="inline">
              <Link
                color="secondary"
                to={`/${edge.node.slug}/`}
                component={GatsbyLink}
              >
                {edge.node.title}
              </Link>
            </Typography>

            <Typography variant="subtitle1" display="inline">
              {" "}
              — {edge.node.excerpt.excerpt}
            </Typography>
            <Typography variant="subtitle2">
              {edge.node.publishedDate}
            </Typography>
          </Box>
        );
      })}
    </Layout>
  );
};

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
            excerpt
          }
        }
      }
    }
  }
`;

export default IndexPage;
