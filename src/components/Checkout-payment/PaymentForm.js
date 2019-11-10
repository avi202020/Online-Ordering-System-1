import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { paymentAction } from "../../actions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const PaymentForm = () => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");

  const dispatch = useDispatch();
  const dispathPayment = useCallback(
    () =>
      dispatch(
        paymentAction({
          cardName,
          cardNumber,
          expDate,
          cvv
        })
      ),
    [cardName, cardNumber, cvv, dispatch, expDate]
  );

  useEffect(() => {
    dispathPayment();
  }, [dispathPayment]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            value={cardName}
            onChange={e => setCardName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            value={expDate}
            onChange={e => setExpDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            value={cvv}
            onChange={e => setCvv(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PaymentForm;
