import axios from 'axios';
// import callApi from '../../../util/apiCaller';

export function userRegisterRequest(userData) {
    return dispatch => {
        return axios.post('/api/users', userData);
    // return callApi('users', 'post', userData);
    };
}

export function isUserExists(username) {
    return dispatch => {
        return axios.get(`/api/users/${username}`);
    // return callApi(`users/${username}`);
    };
}
