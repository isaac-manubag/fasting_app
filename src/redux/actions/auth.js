import constants from "../../utils/constants";

export const loggedIn = () => ({
  type: constants.auth.LOGIN_SUCCESS
});

export const logout = () => ({
  type: constants.auth.LOGGED_OUT
});
