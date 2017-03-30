import callApi from '../../util/apiCaller';


export function getCreatedContests(username) {
    return callApi(`users/created`, 'post', username);
}
