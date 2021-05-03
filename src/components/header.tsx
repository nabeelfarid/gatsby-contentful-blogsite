import React from "react"
import { Link as GatsbyLink } from "gatsby"
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Tooltip,
} from "@material-ui/core"
import { GitHub } from "@material-ui/icons"

interface HeaderProps {
  siteTitle: string
  repo: string
}
const Header: React.FC<HeaderProps> = props => (
  <AppBar position="relative" color="primary">
    <Toolbar>
      <Typography
        variant="h4"
        component={GatsbyLink}
        to="/"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        {props.siteTitle}
      </Typography>
      <Box flexGrow={1} />
      <Tooltip title="Github Repo">
        <IconButton aria-label="github" href={props.repo} target="blank">
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

export default Header
