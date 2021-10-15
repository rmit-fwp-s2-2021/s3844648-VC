import "../App.css";
import { useHistory } from "react-router-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const handleMenuClick = (pageURL) => {
    if (pageURL === "/signin") {
      props.logoutUser();
    }
    history.push(pageURL);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            VIBE CHECK
          </Typography>
          {props.username !== null && (
            <Typography variant="h6" className={classes.title}>
              Welcome back, {props.username}!
            </Typography>
          )}

          {props.username !== null && (
            <div>
              <Button onClick={() => handleMenuClick("/posts")} color="inherit">
                Posts
              </Button>
              <Button onClick={() => handleMenuClick("/users")} color="inherit">
                Users
              </Button>
              <Button
                onClick={() => handleMenuClick("/profile")}
                color="inherit"
              >
                My Profile
              </Button>
              <Button
                onClick={() => handleMenuClick("/signin")}
                color="inherit"
              >
                Logout
              </Button>
            </div>
          )}

          {props.username === null && (
            <>
              <Button
                onClick={() => handleMenuClick("/signup")}
                color="inherit"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => handleMenuClick("/signin")}
                color="inherit"
              >
                Sign In
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
