import axios from 'axios';
// import callApi from '../../../util/apiCaller';
import setAuthorizationToken from './setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user,
    };
}

export function login(data) {
    return dispatch => {
        return axios.post('/api/auth', data).then(res => {
    // return callApi('auth', 'post', {data}).then(res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwtDecode(token)));
        });
    };
}

export function logout() {
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    };
}
