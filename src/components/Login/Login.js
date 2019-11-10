import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInOutAction } from "../../actions";
import history from "../../history";
import Header from "../Header";
import { CLEAR } from "../../actions/types";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import StyleLink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

// eslint-disable-next-line
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [errorEmailInput, setErrorEmailInput] = useState(false);
  const [pass, setPass] = useState("");
  const [errorPassInput, setErrorPassInput] = useState(false);
  const [errResponse, setErrResponse] = useState("");

  const dispatch = useDispatch();
  const dispatchSignInOut = e => dispatch(signInOutAction(e));

  const handleLogIn = async () => {
    const hasErrEmailFormat = !emailRegex.test(email);
    const hasErrEmailInput = email === "";
    const hasErrPassInput = pass === "";

    setErrorEmailInput(hasErrEmailInput || hasErrEmailFormat ? true : false);
    setErrorPassInput(hasErrPassInput ? true : false);

    if (!(hasErrEmailFormat || hasErrEmailInput || hasErrPassInput)) {
      try {
        const res = await axios({
          method: "post",
          url: "/auth/login",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            email: email,
            password: pass
          }
        });
        dispatchSignInOut({ status: true, token: res.data.token });
        // Clear state in Redux store
        dispatch({ type: CLEAR });
        setErrResponse("");
        history.push("/");
      } catch (error) {
        setErrorEmailInput(true);
        setErrorPassInput(true);
        setErrResponse(error.response.data.error);
      }
    }
  };

  return (
    <React.Fragment>
      <Header />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                setErrorEmailInput(!emailRegex.test(e.target.value));
              }}
              error={errorEmailInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={pass}
              onChange={e => {
                setPass(e.target.value);
              }}
              error={errorPassInput}
              helperText={errResponse}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              component={Button}
              onClick={handleLogIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <StyleLink
                  variant="body2"
                  className={classes.registerLink}
                  component={Link}
                  to="/register"
                >
                  {"Don't have an account? Sign Up"}
                </StyleLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Login;
