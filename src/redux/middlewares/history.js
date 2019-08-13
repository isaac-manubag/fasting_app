import firebase from 'react-native-firebase';
import constants from '../../utils/constants';
import { toggleProcessing, setHistory } from '../actions/history';

export const getHistoryFlow = ({ dispatch }) => next => async action => {
  next(action);

  if (action.type === constants.history.GET_HISTORY) {
    dispatch(toggleProcessing(true));
    const fastsRef = firebase.firestore().collection('fasts');
    const snapshot = await fastsRef
      .where('user', '==', firebase.auth().currentUser.uid)
      .orderBy('start', 'desc')
      .get();

    const history = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      history.push({
        id: doc.id,
        start: data.start,
        end: data.end,
        completed: data.completed,
        title: data.title,
      });
    });

    try {
      dispatch(setHistory(history));
    } catch (error) {
      dispatch(toggleProcessing(false));
    }

    dispatch(toggleProcessing(false));
  }
};

export const historyMiddleware = [getHistoryFlow];
