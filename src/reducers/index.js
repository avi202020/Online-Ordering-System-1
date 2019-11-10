import { combineReducers } from "redux";
import selectToppingReducer from "./selectToppingReducer";
import selectSizeReducer from "./selectSizeReducer";
import addressReducer from "./addressReducer";
import paymentReducer from "./paymentReducer";
import totalPriceReducer from "./totalPriceReducer";
import authReducer from './authReducer';
import { CLEAR } from  '../actions/types';

const appReducer = combineReducers({
  totalPrice: totalPriceReducer,
  toppings: selectToppingReducer,
  whichSize: selectSizeReducer,
  address: addressReducer,
  payment: paymentReducer,
  auth: authReducer
});

export default (state, action) => {
  if (action.type === CLEAR) {
    state.totalPrice = undefined
    state.toppings = undefined
    state.whichSize = undefined
  }

  return appReducer(state, action)
}
