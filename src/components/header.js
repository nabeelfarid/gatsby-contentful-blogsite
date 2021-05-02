import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Container,
  Switch,
  Tooltip,
} from "@material-ui/core"
import { GitHub, PowerSettingsNew } from "@material-ui/icons"

const Header = ({ siteTitle }) => (
  <AppBar position="relative" color="inherit">
    <Toolbar>
      <Typography
        variant="h6"
        component={Link}
        to="/"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        Blog Site
      </Typography>
      <Box flexGrow={1} />
      <Tooltip title="Github Repo">
        <IconButton
          aria-label="github"
          href="https://github.com/nabeelfarid/diaries-app"
          target="blank"
        >
          <GitHub />
        </IconButton>
      </Tooltip>
    </Toolbar>
  </AppBar>

  // <header
  //   style={{
  //     background: `rebeccapurple`,
  //     marginBottom: `1.45rem`,
  //   }}
  // >
  //   <div
  //     style={{
  //       margin: `0 auto`,
  //       maxWidth: 960,
  //       padding: `1.45rem 1.0875rem`,
  //     }}
  //   >
  //     <h1 style={{ margin: 0 }}>
  //       <Link
  //         to="/"
  //         style={{
  //           color: `white`,
  //           textDecoration: `none`,
  //         }}
  //       >
  //         {siteTitle}
  //       </Link>
  //     </h1>
  //   </div>
  // </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
