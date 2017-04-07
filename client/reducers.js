/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './Contests/App/AppReducer';
import auth from './Contests/Login/reducers/auth';

// Combine all reducers into one root reducer
export default combineReducers({
    app,
    auth,
});
