import callApi from '../../util/apiCaller';


/*
export function getCreatedContests(username) {
    return callApi('users/created', 'post', username);
}
*/

export function getJoinedContests(username) {
    return callApi(`users/${username}/joined`);
}

export function getJoinableContests(username) {
    return callApi(`users/${username}/joinable`);
}

export function getCreatedContests(username) {
    return callApi(`users/${username}/created`);
}

export function isFirstTimeUser(username) {
    return callApi(`users/${username}/firsttime`);
}
