import { SIGN_IN_OUT } from "../actions/types";

// {size: null, price: null}
const INTIAL_STATE = {
  isSignedIn: false,
  token: ""
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_OUT:
      return {
        ...state,
        isSignedIn: action.payload.status,
        token: action.payload.token        
      };
    default:
      return state;
  }
};
