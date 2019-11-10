import { SUBMIT_ADDRESS } from "../actions/types";

// {size: null, price: null}
const INTIAL_STATE = {
  fn: null,
  ln: null,
  address1: null,
  address2: null,
  city: null,
  state: null,
  zip: null,
  country: null
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SUBMIT_ADDRESS:
      return {
        ...state,
        fn: action.payload.fn,
        ln: action.payload.ln,
        address1: action.payload.address1,
        address2: action.payload.address2,
        city: action.payload.city,
        state: action.payload.state,
        zip: action.payload.zip,
        country: action.payload.country
      };
    default:
      return state;
  }
};
