const app = '[app]';
const auth = '[auth]';
const fast = '[fast]';

export default {
  app: {
    API_REQUEST: `${app} API Request`,
  },
  localStorage: {
    isAuth: `${auth}_is_logged_in`,
  },
  auth: {
    LOGIN_REQUEST_FB: `${auth} LOGIN_REQUEST_FB`,
    LOGIN_REQUEST_GG: `${auth} LOGIN_REQUEST_GG`,
    LOGIN_SUCCESS: `${auth} LOGIN_SUCCESS`,
    LOGIN_ERROR: `${auth} LOGIN_ERROR`,
    LOGOUT: `${auth} LOGOUT`,
    LOGGING_OUT: `${auth} LOGGING_OUT`,
    LOGGED_OUT: `${auth} LOGGED_OUT`,
    TOGGLE_AUTHENTICATING: `${auth} TOGGLE_AUTHENTICATING`,
  },
  fast: {
    TOGGLE_PROCESSING: `${fast} TOGGLE_PROCESSING`,
    START_FAST: `${fast} START_FAST`,
    SET_ACTIVE_FAST: `${fast} SET_ACTIVE_FAST`,
    REMOVE_ACTIVE_FAST: `${fast} REMOVE_ACTIVE_FAST`,
  },
};
