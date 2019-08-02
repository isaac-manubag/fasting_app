import constants from '../../utils/constants';

const defaultState = {
  authenticating: false,
  isLoggedIn: false,
};

export default function authReducer(state = defaultState, action) {
  switch (action.type) {
    case constants.auth.TOGGLE_AUTHENTICATING:
      return {
        ...state,
        authenticating: action.meta.value,
      };

    case constants.auth.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        authenticating: false,
      };

    case constants.auth.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };

    case constants.auth.LOGIN_ERROR:
      return {
        ...state,
        authenticating: false,
        isLoggedIn: false,
      };

    default:
      return state;
  }
}
