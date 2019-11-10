import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signInOutAction } from "../../actions";
import { CLEAR } from "../../actions/types";
import Header from "../Header";
import history from "../../history";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import StyleLink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Register = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [errorEmailInput, setErrorEmailInput] = useState(false);
  const [pass, setPass] = useState("");
  const [errorPassInput, setErrorPassInput] = useState(false);
  const [fn, setFn] = useState("");
  const [errorFnInput, setErrorFnInput] = useState(false);
  const [ln, setLn] = useState("");
  const [errorLnInput, setErrorLnInput] = useState(false);
  const [errPassResponse, setErrPassResponse] = useState("");
  const [errEmailResponse, setErrEmailResponse] = useState("");

  const dispatch = useDispatch();
  const dispatchSignInOut = e => dispatch(signInOutAction(e));

  const handleSubmit = async () => {
    const hasErrEmailFormat = !emailRegex.test(email);
    const hasErrEmailInput = email === "";
    const hasErrPassInput = pass === "";
    const hasErrPassFormat = pass.length < 6;
    const hasErrFnInput = fn === "";
    const hasErrLnInput = ln === "";

    setErrorEmailInput(hasErrEmailInput || hasErrEmailFormat ? true : false);
    setErrorPassInput(hasErrPassInput || hasErrPassFormat ? true : false);
    setErrorFnInput(hasErrFnInput ? true : false);
    setErrorLnInput(hasErrLnInput ? true : false);
    if (hasErrEmailFormat) {
      setErrEmailResponse("Please provide a correct email address");
    } else if (hasErrPassFormat) {
      setErrPassResponse("Please provide at least 6 digits password");
    }

    if (
      !(
        hasErrEmailFormat ||
        hasErrEmailInput ||
        hasErrPassInput ||
        hasErrPassFormat ||
        hasErrFnInput ||
        hasErrLnInput
      )
    ) {
      try {
        const res = await axios({
          method: "post",
          url: "/auth/register",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            firstName: fn,
            lastName: ln,
            email: email,
            password: pass
          }
        });
        dispatchSignInOut({ status: true, token: res.data.token });
        dispatch({ type: CLEAR });

        setErrPassResponse("");
        setErrEmailResponse("");
        history.push("/");
      } catch (error) {
        if (error.response.data.error === "Duplicate field value entered") {
          setErrEmailResponse("Email is already registered");
          setErrorEmailInput(true);
        } else {
          setErrorEmailInput(true);
          setErrorPassInput(true);
          setErrPassResponse(error.response.data.error);
        }
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
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={fn}
                  onChange={e => {
                    setFn(e.target.value);
                  }}
                  error={errorFnInput}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={ln}
                  onChange={e => {
                    setLn(e.target.value);
                  }}
                  error={errorLnInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    setErrorEmailInput(!emailRegex.test(e.target.value));
                  }}
                  error={errorEmailInput}
                  helperText={errEmailResponse}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
                  helperText={errPassResponse}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              component={Button}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <StyleLink variant="body2" component={Link} to="/login">
                  Already have an account? Sign in
                </StyleLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Register;
