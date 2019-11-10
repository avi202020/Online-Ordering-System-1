import { SELECT_SIZE } from "../actions/types";

// {size: null, price: null}
const INTIAL_STATE = {
  size: "Small",
  price: "5.98"
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_SIZE:
      return { ...state, size: action.payload.size, price: action.payload.price };
    default:
      return state;
  }
};
