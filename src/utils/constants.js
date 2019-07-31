const app = "[app]";
const auth = "[auth]";
const profile = "[profile]";

export default {
  app: {
    API_REQUEST: `${app} API Request`
  },
  localStorage: {
    isAuth: `${auth}_is_logged_in`
  },
  auth: {
    LOGIN_REQUEST: `${auth} LOGIN_REQUEST`,
    LOGIN_SUCCESS: `${auth} LOGIN_SUCCESS`,
    LOGIN_ERROR: `${auth} LOGIN_ERROR`,
    LOGOUT: `${auth} LOGOUT`,
    LOGGING_OUT: `${auth} LOGGING_OUT`,
    LOGGED_OUT: `${auth} LOGGED_OUT`,
    TOGGLE_AUTHENTICATING: `${auth} TOGGLE_AUTHENTICATING`
  },
  user: {
    SET_PROFILE: `${profile} SET_PROFILE`,
    PROFILE_REQUEST: `${profile} PROFILE_REQUEST`,
    PROFILE_SUCCESS: `${profile} PROFILE_SUCCESS`,
    PROFILE_ERROR: `${profile} PROFILE_ERROR`,
    TOGGLE_UPDATING: `${profile} TOGGLE_UPDATING`
  }
};
