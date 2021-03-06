/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { getUser } from "../actions/authActions";

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

const adminLinks = () => {
  return (
    <React.Fragment>
      <Button color="inherit" href="../admin/employers">
        Manage employers
      </Button>
    </React.Fragment>
  );
};

const employerLinks = () => {
  return (
    <React.Fragment>
      <Button color="inherit" href="../manager/courses">
        Manage courses
      </Button>
      <Button color="inherit" href="../manager/employees">
        Manage employees
      </Button>
      <Button color="inherit" href="../account">
        Account
      </Button>
    </React.Fragment>
  );
};

const employeeLinks = () => {
  return (
    <React.Fragment>
      <Button color="inherit" href="../employee/courses">
        Courses
      </Button>
      <Button color="inherit" href="../account">
        Account
      </Button>
    </React.Fragment>
  );
};

const renderLinks = (authenticated, setAuthenticated, user) => {
  // const subfolder = "videoinwerken";
  if (authenticated) {
    return (
      <React.Fragment>
        {user && user.is_admin && adminLinks()}

        {user && user.is_employer && employerLinks()}

        {user && user.is_employee && employeeLinks()}

        <Button color="inherit" href="../logout">
          Log out
        </Button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Button color="inherit" href="./#/login">
          Login
        </Button>
        <Button color="inherit" href="./#/signup">
          Sign up
        </Button>
      </React.Fragment>
    );
  }
};

function Header(props) {
  const { authenticated, setAuthenticated } = props;
  const classes = useStyles();

  const [user, setUser] = React.useState(null);

  // Get logged in user
  useEffect(() => {
    if (user == null) {
      console.log("retrieving user header");
      getUser(setUser);
    }
  });

  const userType = () => {
    let type = null;
    if (user.is_admin) type = "ADMIN ";
    if (user.is_employer) type = "EMPLOYER ";
    if (user.is_employee) type = "EMPLOYEE ";
    return type + user.email;
  };

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
            Video Inwerken {user && userType()}
          </Typography>

          {renderLinks(authenticated, setAuthenticated, user)}
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
