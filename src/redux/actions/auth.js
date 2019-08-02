import constants from '../../utils/constants';

export const fbLogin = () => ({
  type: constants.auth.LOGIN_REQUEST_FB,
});

export const googleLogin = () => ({
  type: constants.auth.LOGIN_REQUEST_GG,
});

export const logout = () => ({
  type: constants.auth.LOGOUT,
});
