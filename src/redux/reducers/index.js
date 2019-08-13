import { combineReducers } from 'redux';
import auth from './auth';
import fasts from './fasts';
import history from './history';

const rootReducer = combineReducers({
  auth,
  fasts,
  history,
});

export default rootReducer;
