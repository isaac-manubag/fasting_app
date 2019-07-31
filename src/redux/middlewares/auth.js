// react dotenv version 1551921186
import constants from "../../utils/constants";
import { AsyncStorage } from 'react-native';

export const userLogoutFlow = ({ dispatch }) => next => action => {
  if (action.type === constants.auth.LOGGED_OUT) {
    localStorage.removeItem(constants.localStorage.isAuth);
  }
  next(action);
};

export const authMiddleware = [userLogoutFlow];
