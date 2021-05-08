require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  flags: {
    FAST_DEV: true,
    FAST_REFRESH: true,
  },
  siteMetadata: {
    title: `Blog Site`,
    description: `Blog site created with Gatsby and Contentful`,
    author: `Nabeel Farid`,
    repo: "https://github.com/nabeelfarid/gatsby-contentful-blogsite",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-theme-material-ui`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Blog Sitet`,
        short_name: `BlogSite`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "FaunaBookmarksDb",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "fauna",
        url: "https://graphql.fauna.com/graphql",
        headers: {
          Authorization: "Bearer fnAEIjPQPhACCVLvJehGIk9x3a13Tn9g_iYYvQGl",
        },
      },
    }`gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN,
        forceFullSync: true,
        downloadLocal: true,
      },
    },
  ],
};
