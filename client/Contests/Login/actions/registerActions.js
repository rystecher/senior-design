import axios from 'axios';
// import callApi from '../../../util/apiCaller';

export function userRegisterRequest(userData) {
    return dispatch => {
        return axios.post('/api/users', userData);
    // return callApi('users', 'post', userData);
    };
}

export function isUserExists(identifier) {
    return dispatch => {
        return axios.get(`/api/users/${identifier}`);
    // return callApi(`users/${username}`);
    };
}
