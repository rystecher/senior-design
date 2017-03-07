/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './Contests/App/AppReducer';
import contests from './Contests/ContestReducer';
import flashMessages from './Contests/Login/reducers/flashMessages';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  contests,
  flashMessages
});
