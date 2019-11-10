import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalPriceAction } from "../../actions";
import useStyles from "./style";
import history from "../../history";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

const Submit = () => {
  const classes = useStyles();

  const [totalPrice, setTotalPrice] = useState(0);
  const selectedSize = useSelector(state => state.whichSize);
  const selectedToppings = useSelector(state => state.toppings);

  const isSignedIn = useSelector(state => state.auth.isSignedIn);

  const dispatch = useDispatch();
  const dispatchTotalPrice = useCallback(() => dispatch(totalPriceAction(totalPrice)), [
    dispatch,
    totalPrice
  ]);

  useEffect(() => {
    const total = calculatePrice(selectedSize, selectedToppings);
    setTotalPrice(total);
    dispatchTotalPrice();
  }, [dispatchTotalPrice, selectedSize, selectedToppings]);

  const calculatePrice = (chooseSize, chooseToppings) => {
    const total = chooseToppings
      .map(item => Number(item.ToppingPrice))
      .reduce((acc, cur) => acc + cur, Number(chooseSize.price));
    return total;
  };

  const handleClick = () => {
    if (isSignedIn) {
      history.push("/checkout");
    } else {
      history.push("/login");
    }
  };

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title}>Summary</Typography>
      <List className={classes.group}>
        <ListItem className={classes.groupToppings}>
          <ListItemText
            primary={`Burger (${selectedSize.size})`}
            secondary={`$${selectedSize.price}`}
          />
        </ListItem>
        {selectedToppings.map(item => (
          <ListItem key={item.ToppingName} className={classes.groupToppings}>
            <ListItemText primary={`${item.ToppingName}`} secondary={`$${item.ToppingPrice}`} />
          </ListItem>
        ))}
      </List>
      <hr style={{ width: "90%" }} />
      <ListItemText
        className={classes.sum}
        primary={"Total"}
        secondary={`$${totalPrice.toFixed(2)}`}
      />
      <Button
        data-test="testSubmitButton"
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendIcon />}
        component={Button}
        onClick={handleClick}
      >
        Submit
      </Button>
    </Paper>
  );
};

export default Submit;
