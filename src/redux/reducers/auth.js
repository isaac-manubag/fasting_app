import constants from "../../utils/constants";

const defaultState = {
  authenticating: false,
  isLoggedIn: false
};

export default function authReducer(state = defaultState, action) {
  switch (action.type) {
    case constants.auth.LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false
      };

    default:
      return state;
  }
}
