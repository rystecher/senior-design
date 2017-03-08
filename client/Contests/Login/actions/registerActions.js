import callApi from '../../../util/apiCaller';

export function userRegisterRequest(userData) {
  return dispatch => {
    return callApi('users', 'post', userData);
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return callApi(`users/${identifier}`);
  }
}
