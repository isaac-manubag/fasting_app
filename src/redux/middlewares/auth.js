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
        return;
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        // handle this however suites the flow of your app
        throw new Error(
          'Something went wrong obtaining the users access token',
        );
      }
      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));

      dispatch({
        type: constants.auth.LOGIN_SUCCESS,
      });
    } catch (e) {
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

      // add any configuration settings here:
      await GoogleSignin.configure();

      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken,
      );
      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));

      dispatch({
        type: constants.auth.LOGIN_SUCCESS,
      });
    } catch (e) {
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
