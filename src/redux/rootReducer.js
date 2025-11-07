/* Instruments */
import { combineReducers } from 'redux';
import UserReducer from './slices/user';
import SettingsReducer from './slices/settings';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can use other storage options if needed

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const settingsPersistConfig = { key: 'settings', storage, keyPrefix: 'redux-' };
const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['user', 'isAuthenticated'],
};

const reducer = combineReducers({
  user: persistReducer(userPersistConfig, UserReducer),
  settings: persistReducer(settingsPersistConfig, SettingsReducer),
});

export { rootPersistConfig, reducer };
