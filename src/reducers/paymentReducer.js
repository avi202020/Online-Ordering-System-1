import { SUBMIT_PAYMENT } from "../actions/types";

// {size: null, price: null}
const INTIAL_STATE = {
  cardName: null,
  cardNumber: null,
  expDate: null,
  cvv: null,
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SUBMIT_PAYMENT:
      return {
        ...state,
        cardName: action.payload.cardName,
        cardNumber: action.payload.cardNumber,
        expDate: action.payload.expDate,
        cvv: action.payload.cvv
      };
    default:
      return state;
  }
};
