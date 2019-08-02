import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
import apiMiddleware from './middlewares/api';
import { authMiddleware } from './middlewares/auth';

const composeEnhancers = compose;
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'fasts'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...authMiddleware, apiMiddleware))
);

export const persistor = persistStore(store);

export default function Store() {
  return store;
}
