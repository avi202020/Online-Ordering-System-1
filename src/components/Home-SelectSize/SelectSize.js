import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectSizeAction } from "../../actions/index";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FastfoodIcon from "@material-ui/icons/Fastfood";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: "10px 20px"
  },
  label: {
    display: "inline-block",
    fontSize: "20px",
    fontWeight: "700",
    padding: theme.spacing(0, 2)
  },
  group: {
    marginTop: "10px",
    padding: theme.spacing(0, 2)
  }
}));

const SelectSize = () => {
  const classes = useStyles();
  const options = [
    { size: "Small", price: "5.98" },
    { size: "Medium", price: "9.98" },
    { size: "Large", price: "19.98" }
  ];
  const initialState = options[0];

  const [decision, setValue] = useState(initialState);

  const dispatch = useDispatch();
  const dispatchSelectSize = useCallback(() => dispatch(selectSizeAction(decision)), [
    decision,
    dispatch
  ]);

  useEffect(() => {
    dispatchSelectSize();
  }, [dispatchSelectSize]);

  const handleChange = event => {
    const selectedOption = options.find(item => item.size === event.target.value);
    setValue(selectedOption);
  };

  return (
    <FormControl component="fieldset" className={classes.root}>
      <FormLabel component="legend" className={classes.label}>
        Select Size <FastfoodIcon fontSize="large" />
      </FormLabel>
      <RadioGroup
        aria-label="position"
        name="position"
        value={decision.size}
        onChange={handleChange}
        row
        className={classes.group}
      >
        {options.map(val => (
          <FormControlLabel
            key={val.size}
            checked={val.size === decision.size ? true : false}
            value={val.size}
            control={<Radio color="secondary" />}
            label={val.size}
            labelPlacement="end"
            className={classes.item}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SelectSize;
