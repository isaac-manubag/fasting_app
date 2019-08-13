import constants from '../../utils/constants';

const defaultState = {
  authenticating: false,
  isLoggedIn: false,
  user: null,
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
        user: action.payload.user,
      };

    case constants.auth.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };

    case constants.auth.LOGIN_ERROR:
      return {
        ...state,
        authenticating: false,
        isLoggedIn: false,
        user: null
      };

    default:
      return state;
  }
}
