// react dotenv version 1551921186
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import constants from '../../utils/constants';

export const userLoginFlow = ({ dispatch }) => next => async action => {
  next(action);

  if (action.type === constants.auth.LOGIN_REQUEST_FB) {
    try {
      dispatch({
        type: constants.auth.TOGGLE_AUTHENTICATING,
        meta: {
          value: true,
        },
      });

      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        dispatch({
          type: constants.auth.LOGIN_ERROR,
        });

        return;
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error(
          'Something went wrong obtaining the users access token'
        );
      }

      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      dispatch({
        type: constants.auth.LOGIN_SUCCESS,
        payload: {
          user: firebaseUserCredential,
        },
      });
    } catch (e) {
      dispatch({
        type: constants.auth.LOGIN_ERROR,
      });
      throw e;
    }
  } else if (action.type === constants.auth.LOGIN_REQUEST_GG) {
    try {
      dispatch({
        type: constants.auth.TOGGLE_AUTHENTICATING,
        meta: {
          value: true,
        },
      });

      await GoogleSignin.configure({
        webClientId:
          '1050830759732-h1jvv8c1fnv1fnjqaictr6e10i2i7iea.apps.googleusercontent.com',
        offlineAccess: true,
      });

      const data = await GoogleSignin.signIn();
      console.log(data);
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );

      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      dispatch({
        type: constants.auth.LOGIN_SUCCESS,
        payload: {
          user: firebaseUserCredential,
        },
      });
    } catch (e) {
      dispatch({
        type: constants.auth.LOGIN_ERROR,
      });
      throw e;
    }
  }
};

export const userLogoutFlow = ({ dispatch }) => next => action => {
  if (action.type === constants.auth.LOGOUT) {
  }
  next(action);
};

export const authMiddleware = [userLoginFlow, userLogoutFlow];
