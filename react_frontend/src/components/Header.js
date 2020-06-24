import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const renderLinks = (authenticated, setAuthenticated) => {
  if (authenticated) {
    return (
      <React.Fragment>
        <Button color="inherit" href="../manager/employees">
          Manage Employees
        </Button>
        <Button color="inherit" href="../manager/courses">
          Manage Courses
        </Button>
        <Button color="inherit" href="../profile">
          Profile
        </Button>
        <Button color="inherit" href="../logout">
          Log out
        </Button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Button color="inherit" href="../login">
          Login
        </Button>
        <Button color="inherit" href="../signup">
          Sign up
        </Button>
      </React.Fragment>
    );
  }
};

function Header(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Video Inwerken
          </Typography>

          {renderLinks(props.authenticated, props.setAuthenticated)}
        </Toolbar>
      </AppBar>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated, // DEZE DOET DUS WEL DAADWERKELIJK IETSSSSSS
  };
}
export default connect(mapStateToProps)(Header);
