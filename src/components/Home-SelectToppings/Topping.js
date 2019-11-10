import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { selectToppingAction, deSelectToppingAction } from "../../actions";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const Topping = ({ ToppingName, ToppingPrice }) => {
  const [isSelected, setSelected] = useState(false);

  const dispatch = useDispatch();
  const dispatchSelectTopping = useCallback(
    () => dispatch(selectToppingAction({ ToppingName, ToppingPrice })),
    [ToppingName, ToppingPrice, dispatch]
  );
  const dispatchDeSelectTopping = useCallback(
    () => dispatch(deSelectToppingAction({ ToppingName, ToppingPrice })),
    [ToppingName, ToppingPrice, dispatch]
  );

  const handleClick = () => {
    if (!isSelected) {
      dispatchSelectTopping();
    } else {
      dispatchDeSelectTopping();
    }
    setSelected(!isSelected);
  };

  return (
    <Chip
      icon={isSelected ? <CheckCircleIcon /> : null}
      label={ToppingName}
      onClick={handleClick}
      color={isSelected ? "primary" : "default"}
    />
  );
};

Topping.propTypes = {
  ToppingName: PropTypes.string.isRequired,
  ToppingPrice: PropTypes.number.isRequired
};

export default Topping;
