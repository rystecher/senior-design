/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import contests from './modules/Contests/ContestReducer';
import intl from './modules/Intl/IntlReducer';
import flashMessages from './modules/Login/reducers/flashMessages';
import auth from './modules/Login/reducers/auth';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  contests,
  intl,
  flashMessages,
  auth
});
