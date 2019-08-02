import { combineReducers } from 'redux';
import auth from './auth';
import fasts from './fasts';

const rootReducer = combineReducers({
  auth,
  fasts,
});

export default rootReducer;
