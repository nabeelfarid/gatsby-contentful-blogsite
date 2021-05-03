import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Box, Container, Divider, Link, Typography } from "@material-ui/core"
import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          repo
        }
      }
    }
  `)

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata?.title}
        repo={data.site.siteMetadata?.repo}
      />
      <Container maxWidth="md">
        <Box mt={2}>
          <main>{children}</main>
          <footer>
            <Box mt={5}>
              <Divider />
              <Box mt={1}>
                <Typography>
                  © {new Date().getFullYear()}, Built with
                  {` `}
                  <Link color="primary" href="https://www.gatsbyjs.com">
                    Gatsby
                  </Link>
                </Typography>
              </Box>
            </Box>
          </footer>
        </Box>
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
