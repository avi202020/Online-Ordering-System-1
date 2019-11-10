// import streams from '../apis/streams';
import {
  SELECT_SIZE,
  SELECT_TOPPING,
  DESELECT_TOPPING,
  TOTAL_PRICE,
  SUBMIT_ADDRESS,
  SUBMIT_PAYMENT,
  SIGN_IN_OUT
} from './types';

export const selectSizeAction = option => {
  return {
    type: SELECT_SIZE,
    payload: option
  };
};

export const selectToppingAction = option => {
  return {
    type: SELECT_TOPPING,
    payload: option
  };
};

export const deSelectToppingAction = option => {
  return {
    type: DESELECT_TOPPING,
    payload: option
  }
}

export const totalPriceAction = option => {
  return {
    type: TOTAL_PRICE,
    payload: option
  }
}

export const addressAction = option => {
  return {
    type: SUBMIT_ADDRESS,
    payload: option
  }
}

export const paymentAction = option => {
  return {
    type: SUBMIT_PAYMENT,
    payload: option
  }
}

export const signInOutAction = option => {
  return {
    type: SIGN_IN_OUT,
    payload: option
  }
}
