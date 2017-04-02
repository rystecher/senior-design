import callApi from '../../util/apiCaller';


export function getCreatedContests(username) {
    return callApi(`users/created`, 'post', username);
}

export function getJoinedContests(username) {
    return callApi(`users/joined`, 'post', username);
}
