import React from "react";
import Topping from "./Topping";
import ToppingsList from "./ToppingsList";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import CakeIcon from "@material-ui/icons/Cake";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "10px 20px"
  },
  title: {
    fontWeight: "700",
    fontSize: "20px",
    padding: theme.spacing(0, 2)
  },
  group: {
    display: "flex",
    marginTop: "20px",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    },
    padding: theme.spacing(0, 2),
    paddingBottom: "30px"
  }
}));

const SelectToppings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormLabel component="legend" className={classes.title}>
        Select Toppings <CakeIcon fontSize="large" />
      </FormLabel>
      <div className={classes.group}>
        {ToppingsList.map(item => (
          <Topping key={item.name} ToppingName={item.name} ToppingPrice={item.price} />
        ))}
      </div>
    </div>
  );
};

export default SelectToppings;
