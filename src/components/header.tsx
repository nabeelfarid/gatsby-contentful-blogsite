import React, { useContext } from "react";
import { Link as GatsbyLink } from "gatsby";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  Icon,
} from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import { green, red } from "@material-ui/core/colors";
import { IdentityContext } from "../utils/IdentityContextProvider";

interface HeaderProps {
  siteTitle: string;
  repo: string;
}
const Header: React.FC<HeaderProps> = (props) => {
  const { user, identity } = useContext(IdentityContext);
  return (
    <AppBar position="static" color="primary">
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
          <IconButton
            color="inherit"
            aria-label="github"
            href={props.repo}
            target="blank"
          >
            <GitHub />
          </IconButton>
        </Tooltip>
        {user ? (
          <Tooltip title="Logout">
            <IconButton
              aria-label="logout"
              onClick={async () => await identity.logout()}
              style={{ color: red[500] }}
            >
              <Icon>logout</Icon>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Login">
            <IconButton
              aria-label="login"
              onClick={() => {
                identity.open("login");
              }}
              style={{ color: green[700] }}
            >
              <Icon>login</Icon>
            </IconButton>
          </Tooltip>
        )}
        {/* <Icon>add_circle</Icon>
      <Icon color="primary">add_circle</Icon>
      <Icon color="secondary">add_circle</Icon>
      <Icon style={{ color: green[500] }}>add_circle</Icon>
      <Icon fontSize="small">add_circle</Icon>
      <Icon fontSize="large">add_circle</Icon>
      <Icon style={{ fontSize: 30 }}>add_circle</Icon> */}
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
  );
};

export default Header;
