// react dotenv version 1551921186
import firebase from 'react-native-firebase';
import moment from 'moment';
import constants from '../../utils/constants';
import {
  setActiveFast,
  removeActiveFast,
  toggleProcessing,
} from '../actions/fasts';
import { logout } from '../actions/auth';

const firestoreRef = firebase.firestore().collection('fasts');

export const userFastingFlow = ({ dispatch }) => next => async action => {
  next(action);

  if (action.type === constants.fast.START_FAST) {
    dispatch(toggleProcessing(true));

    try {
      const { item } = action.payload;
      const start = moment().unix();
      const end = moment()
        // .add(item.time_to_fast, 'hours')
        .add(30, 'seconds')
        .unix();

      firestoreRef
        .add({
          title: item.title,
          start,
          end,
          completed: false,
          user: firebase.auth().currentUser.uid,
        })
        .then(fast => {
          dispatch(setActiveFast(fast.id, item.title, start, end));
          dispatch(toggleProcessing(false));
        })
        .catch(error => {
          dispatch(toggleProcessing(false));
          console.log('fast add err: ', error);
        });
    } catch (e) {
      dispatch(removeActiveFast());
      dispatch(toggleProcessing(false));

      if (e.message === "Cannot read property 'uid' of null") {
        dispatch(logout());
      }

      throw e;
    }
  } else if (action.type === constants.fast.UPDATE_ACTIVE_FAST) {
    dispatch(toggleProcessing(true));

    try {
      const { item, id } = action.payload;
      const start = item.start;
      const end = moment(moment.unix(item.start))
        .add(item.time_to_fast, 'hours')
        .unix();

      firestoreRef
        .doc(id)
        .update({
          title: item.title,
          start,
          end,
        })
        .then(() => {
          dispatch(setActiveFast(id, item.title, item.start, end));
          dispatch(toggleProcessing(false));
        })
        .catch(error => {
          dispatch(toggleProcessing(false));
          throw error;
        });
    } catch (e) {
      dispatch(removeActiveFast());
      dispatch(toggleProcessing(false));

      if (e.message === "Cannot read property 'uid' of null") {
        dispatch(logout());
      }

      throw e;
    }
  } else if (action.type === constants.fast.END_FAST) {
    dispatch(toggleProcessing(true));

    try {
      const { item } = action.payload;
      const {id, end} = item;
      let completed = false;
      
      if (moment().unix() >= end) {
        completed = true;
      }


      firestoreRef
        .doc(id)
        .update({
          completed,
        })
        .then(() => {
          dispatch(removeActiveFast());
          dispatch(toggleProcessing(false));
        })
        .catch(error => {
          dispatch(removeActiveFast());
          dispatch(toggleProcessing(false));
          throw error;
        });
    } catch (e) {
      dispatch(toggleProcessing(false));

      if (e.message === "Cannot read property 'uid' of null") {
        dispatch(logout());
      }

      throw e;
    }
  }
};

export const fastsMiddleware = [userFastingFlow];
