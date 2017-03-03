/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import contests from './modules/Contests/ContestReducer';
import flashMessages from './modules/Login/reducers/flashMessages';
import auth from './modules/Login/reducers/auth';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  contests,
  flashMessages
});
