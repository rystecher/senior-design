import callApi from '../../../util/apiCaller';

export function userRegisterRequest(userData) {
    return () => {
        return callApi('users', 'post', userData);
    };
}

export function isUserExists(username) {
    return () => {
        return callApi(`users/${username}`);
    };
}
