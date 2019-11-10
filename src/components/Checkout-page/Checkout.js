import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import history from "../../history";
import AddressForm from "../Checkout-address";
import PaymentForm from "../Checkout-payment";
import Review from "../Checkout-review";
import { CLEAR } from "../../actions/types";
import Header from '../Header';
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  loadCircle: {
    marginTop: "10%",
    marginLeft: "45%"
  }
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

const renderCheckoutStepPage = step => {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
};

const Checkout = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [successOrder, setSuccessOrder] = useState(false);
  const [orderNum, setOrderNum] = useState("");
  const { isSignedIn, token } = useSelector(state => state.auth);
  const { size } = useSelector(state => state.whichSize);
  const toppings = useSelector(state => state.toppings).map(item => item.ToppingName);
  const { cardNumber } = useSelector(state => state.payment);
  const address = useSelector(state => state.address);
  const { totalPrice } = useSelector(state => state.totalPrice);

  useEffect(() => {
    if (!isSignedIn) {
      history.push("/login");
    }
  }, [isSignedIn]);

  const handleNext = e => {
    setActiveStep(activeStep + 1);

    if (e.target.textContent === "Place order") {
      submitOrderToBackend();
    }
  };

  const dispatch = useDispatch();

  const submitOrderToBackend = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "/order",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ".concat(token)
        },
        data: {
          burgerSize: size,
          toppings: toppings,
          receiverFirstName: address.fn,
          receiverLastName: address.ln,
          address1: address.address1,
          address2: address.address2,
          city: address.city,
          state: address.state,
          zipCode: address.zip,
          country: address.country,
          paymentCard: cardNumber,
          totalPrice: totalPrice
        }
      });
      setLoading(false);
      setSuccessOrder(true);
      setOrderNum(res.data.data);
    } catch (error) {
      console.log(error.response.data.error);
    }
    // Clear state in Redux store
    dispatch({ type: CLEAR });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const renderCheckoutFinalPage = () => {
    if (loading) {
      return <CircularProgress className={classes.loadCircle} />;
    }
    if (successOrder) {
      return (
        <React.Fragment>
          <Typography variant="h5" gutterBottom>
            Thank you for your order.
          </Typography>
          <Typography variant="subtitle1">
            Your order number is
            <Typography variant="body1" display="inline" color="secondary">
              {" "}
              {orderNum}
            </Typography>
            . We have emailed your order confirmation, and will send you an update when your order
            has shipped.
          </Typography>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Typography variant="h5" gutterBottom>
            Failed to place your order.
          </Typography>
          <Typography variant="subtitle1">
            Please check your order and try again. Sorry for inconvenience.
          </Typography>
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>{renderCheckoutFinalPage()}</React.Fragment>
            ) : (
              <React.Fragment>
                {renderCheckoutStepPage(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default Checkout;
