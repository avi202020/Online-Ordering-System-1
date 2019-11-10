import {  SELECT_TOPPING, DESELECT_TOPPING } from "../actions/types";

// {name: null, price: null}
const INTIAL_STATE = []

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_TOPPING:
      return [...state, action.payload]
    case DESELECT_TOPPING:
      return state.filter(e => e.ToppingName !== action.payload.ToppingName)
    default:
      return state;
  }
}