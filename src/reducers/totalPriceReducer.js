import { TOTAL_PRICE } from "../actions/types";

// {totalPrice: null}
const INTIAL_STATE = {
  totalPrice: null
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case TOTAL_PRICE:
      return { ...state, totalPrice: action.payload };
    default:
      return state;
  }
};
