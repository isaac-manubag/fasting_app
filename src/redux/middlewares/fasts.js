// react dotenv version 1551921186
import firebase from 'react-native-firebase';
import moment from 'moment';
import constants from '../../utils/constants';
import { setActiveFast, removeActiveFast } from '../actions/fasts';

const firestoreRef = firebase.firestore().collection('fasts');
const firebaseUser = firebase.auth().currentUser;

export const userLoginFlow = ({ dispatch }) => next => async action => {
  next(action);

  if (action.type === constants.fast.START_FAST) {
    try {
      const { item } = action.payload;
      const start = moment().unix();
      const end = moment()
        .add(item.time_to_fast, 'hours')
        .unix();

      firestoreRef
        .add({
          title: item.title,
          start,
          end,
          completed: false,
          user: firebaseUser.uid,
        })
        .then(fast => {
          dispatch(setActiveFast(fast.id, item.title, start, end));
        })
        .catch(error => {
          console.log('fast add err: ', error);
        });
    } catch (e) {
      dispatch(removeActiveFast());
      throw e;
    }
  }
};

export const fastsMiddleware = [userLoginFlow];
