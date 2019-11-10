import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PeopleIcon from "@material-ui/icons/People";
import history from "../../history";
import { useSelector, useDispatch } from "react-redux";
import { signInOutAction } from "../../actions";
import { CLEAR } from "../../actions/types";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  Bar: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  FastfoodIcon: {
    marginRight: theme.spacing(4)
  },
  title: {
    flexGrow: 1
  },
  button: {
    fontWeight: "500",
    fontSize: "20px"
  }
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const isSignedIn = useSelector(state => state.auth.isSignedIn);

  const dispatch = useDispatch();
  const dispatchSignInOut = e => dispatch(signInOutAction(e));

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    dispatchSignInOut({status: false, token: ""})
    // Clear state in Redux store
    dispatch({type: CLEAR})
    history.push("/");
  };

  const renderLogInOut = () => {
    if (isSignedIn) {
      return (
        <div>
          <IconButton
            color="primary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.button}
          >
            {/* Open Menu */}
            <PeopleIcon fontSize="large" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/myorders">My orders</MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </Menu>
        </div>
      );
    } else {
      return (
        <Button color="primary" className={classes.button} component={Link} to="/login">
          Login
        </Button>
      );
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.Bar}>
        <Toolbar>
          <Link to="/">
            <IconButton edge="start" color="primary" aria-label="menu">
              <FiberNewIcon fontSize="large" />
            </IconButton>
          </Link>

          <Typography variant="h6" className={classes.title}>
            Online Burger
          </Typography>
          {renderLogInOut()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
