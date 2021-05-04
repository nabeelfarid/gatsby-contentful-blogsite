import React, { useContext } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS } from "@contentful/rich-text-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import { IdentityContext } from "../utils/IdentityContextProvider";
import TruncateMarkup from "react-truncate-markup";
import * as blogPostGatedstyles from "./blogPostGated.module.css";

//Check to see if an unregistered user has already used his quota of 3 free blogs
const isFree = (slug: string) => {
  if (typeof Storage !== "undefined") {
    let posts = localStorage.getItem("freeBlogPosts");
    if (posts) {
      posts = JSON.parse(posts);
      if (posts[slug]) {
        return true;
      }
      if (Object.keys(posts).length < 3) {
        posts[slug] = slug;
        localStorage.freeBlogPosts = JSON.stringify(posts);
        return true;
      }
    } else {
      let posts = {};
      posts[slug] = slug;
      localStorage.freeBlogPosts = JSON.stringify(posts);
      return true;
    }
    console.log(Object.keys(posts).length);
  }

  return false;
};

const BlogPostGated = (props) => {
  const { user, identity } = useContext(IdentityContext);

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
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
        );
      },
      [INLINES.HYPERLINK]: (node) => {
        // console.log("node", node);
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
          );
        } else
          return (
            <Link href={node.data.uri} target="_blank" rel="noopener">
              {node.content[0].value}
            </Link>
          );
      },
    },
  };

  return (
    <>
      <Typography variant="h5">{props.data.title}</Typography>
      <Typography variant="subtitle2">{props.data.publishedDate}</Typography>
      <Divider />
      {props.data.featuredImage && (
        <Box my={2}>
          <GatsbyImage
            image={getImage(props.data.featuredImage)}
            alt={props.data.title}
          />
        </Box>
      )}
      <Typography variant="body1" style={{ fontWeight: "bold" }}>
        {props.data.excerpt.excerpt}
      </Typography>

      {user || isFree(props.data.slug) ? (
        <Typography variant="body1">
          {renderRichText(props.data.body, options)}
        </Typography>
      ) : (
        <>
          <Box my={2} className={blogPostGatedstyles.blogPostGradient}>
            <Typography variant="body1">
              <TruncateMarkup lines={10}>
                <div>{renderRichText(props.data.body, options)}</div>
              </TruncateMarkup>
            </Typography>
          </Box>
          <Box mx="auto" display="flex" justifyContent="center" maxWidth={400}>
            <Card variant="outlined">
              <CardHeader
                title={
                  <Typography variant="h5">
                    Please Login or Signup to read the rest of the Article{" "}
                  </Typography>
                }
              ></CardHeader>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={() => {
                        identity.open("login");
                      }}
                    >
                      Login
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={() => {
                        identity.open("signup");
                      }}
                    >
                      Signup
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </>
      )}
    </>
  );
};

export default BlogPostGated;
