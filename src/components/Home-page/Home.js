import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import SelectSize from "../Home-SelectSize";
import SelectToppings from "../Home-SelectToppings";
import Submit from "../Home-Submit";
import Header from "../Header";


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "20px",
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header />
      <Paper className={classes.root}>
        <SelectSize />
        <SelectToppings />
      </Paper>
      <Submit />
    </React.Fragment>
  );
};

export default Home;
