import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { addressAction } from "../../actions";

const AddressForm = () => {
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();
  const dispathAddress = useCallback(
    () => dispatch(addressAction({ fn, ln, address1, address2, city, state, zip, country })),
    [address1, address2, city, country, dispatch, fn, ln, state, zip]
  );

  useEffect(() => {
    dispathAddress();
  }, [dispathAddress]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            value={fn}
            onChange={e => setFn(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            value={ln}
            onChange={e => setLn(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            value={address1}
            onChange={e => setAddress1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            value={address2}
            onChange={e => setAddress2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            value={state}
            onChange={e => setState(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            value={zip}
            onChange={e => setZip(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AddressForm;
