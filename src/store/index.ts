import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer} from 'redux-persist';
import rootReducer from '@/reducer';
import storage from 'redux-persist/lib/storage';

const config = {
  key: 'key',
  storage: storage,
  blacklist: [],
  whitelist: ['local', 'set'],
};

const isDev = process.env.NODE_ENV === 'development';

const store = createStore(
  persistReducer(config, rootReducer),
  isDev ? applyMiddleware(thunk, logger) : applyMiddleware(thunk),
);
const persistor = persistStore(store);

export { store, persistor }

export * from './connect';
