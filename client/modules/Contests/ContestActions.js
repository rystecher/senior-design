import callApi from '../../util/apiCaller';

// Export Constants

export const ADD_CONTEST = 'ADD_CONTEST';
export const GET_CONTESTS = 'GET_CONTESTS';
export const GET_MY_CONTESTS = 'GET_MY_CONTESTS';
export const GET_NOT_MY_CONTESTS = 'GET_NOT_MY_CONTESTS';
export const DELETE_CONTEST = 'DELETE_CONTEST';

// Export Actions
export function addContest(contest) {
  return {
    type: ADD_CONTEST,
    contest,
  };
}

export function addContestRequest(contest) {
  return (dispatch) => {
    return callApi('contests', 'post', {
      contest: {
        name: contest.name,
      },
  }).then(res => dispatch(addContest(res.contest)));
  };
}

export function addTeamToContestRequest(contest_id, team) {
    return callApi(`contests/${contest_id}`, 'post', {
        team: {
            name: team.name,
            memberList: [],
        },
    }).then(res => console.log(res));
}

export function addAccountToTeam(contest_id, team_id, account_id) {
  return (dispatch) => {
    return callApi(`contests/${contest_id}/${team_id}`, 'post', {
      account_id: account_id,
  }).then(res => dispatch(addContest(res.team)));
  };
}

export function getContests(contests) {
  return {
    type: GET_CONTESTS,
    contests,
  };
}

export function fetchContests() {
  return (dispatch) => {
    return callApi('contests').then(res => {
      dispatch(getContests(res.contests));
    });
  };
}

export function fetchContest(cuid) {
  return (dispatch) => {
    return callApi(`contests/${cuid}`).then(res => console.log(res));
  };
}

export function fetchScoreboardData(cuid) {
    return callApi(`contests/${cuid}/scoreboard`).then(res => console.log(res));
}

export function getMyContests(contests) {
  return {
    type: GET_MY_CONTESTS,
    contests,
  };
}

export function fetchMyContests(cuids) {
  return (dispatch) => {
    return callApi(`contests/my`, "get", cuids).then(res => dispatch(getMyContests(res.contests)));
  };
}

export function getNotMyContests(contests) {
  return {
    type: GET_NOT_MY_CONTESTS,
    contests,
  };
}

export function fetchNotMyContests(cuids) {
    addTeamToContestRequest("cikqgkv4q01ck7453ualdn3hh", {name: "Team one", score: 5});
    addTeamToContestRequest("cikqgkv4q01ck7453ualdn3hh", {name: "Team two", score: 10});
    addTeamToContestRequest("cikqgkv4q01ck7453ualdn3hh", {name: "Team three", score: 7});
    fetchContest("cikqgkv4q01ck7453ualdn3hj");
    fetchScoreboardData("cikqgkv4q01ck7453ualdn3hj");
    //addAccountToTeam(contest_id, team_id, "account_id");
  return (dispatch) => {
    return callApi(`contests/join`, "get", cuids).then(res => dispatch(getNotMyContests(res.contests)));
  };
}

export function deleteContest(cuid) {
  return {
    type: DELETE_CONTEST,
    cuid,
  };
}

export function deleteContestRequest(cuid) {
  return (dispatch) => {
    return callApi(`contests/${cuid}`, 'delete').then(() => dispatch(deleteContest(cuid)));
  };
}
