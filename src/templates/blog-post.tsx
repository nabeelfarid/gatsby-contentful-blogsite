import React, { useContext } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { IdentityContext } from "../utils/IdentityContextProvider";
import BlogPostGated from "../components/blogPostGated";

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
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
`;

const BlogPost = (props) => {
  const { user, identity } = useContext(IdentityContext);

  return (
    <Layout>
      <Seo title={props.data.contentfulBlogPost.title} />
      <BlogPostGated data={props.data.contentfulBlogPost} />
    </Layout>
  );
};

export default BlogPost;
