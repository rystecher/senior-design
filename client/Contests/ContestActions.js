import callApi, {callApiForFile} from '../util/apiCaller';

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

export function createContest(contest) {
    return callApi('contests', 'post', { contest });
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
    callApi(`contests/${contest_id}/teams/${team_id}`, 'post', {
        account_id: account_id,
    }).then(res => console.log(res));
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
    return callApi(`contests/${cuid}/scoreboard`);
}

export function getNumberOfProblems(contest_id) {
    return callApi(`contests/${contest_id}/number_of_problems`);
}

export function startContest(contest_id) {
    return callApi(`contests/${contest_id}/start`, 'post', { start: true });
}

export function sendJudgeMessage(contest_id, team_id, message) {
    return callApi(`messages/${contest_id}/team/${team_id}/judge`, 'post', {
        message
    });
}

export function fetchTeamMessages(contest_id, team_id) {
    return callApi(`messages/${contest_id}/team/${team_id}`).then(res => {
        return res.messages;
    });
}

export function fetchJudgeMessages(contest_id) {
    return callApi(`messages/${contest_id}/judge`).then(res => {
        return res.teams;
    });
}

export function fetchSolvedArrays(contest_id, team_id) {
    callApi(`contests/${contest_id}/teams/${team_id}/solved`).then(res => console.log(res));
}

export function fetchSubmissions(contest_id) {
    callApi(`submissions/${contest_id}`).then(res => console.log(res));
}

export function fetchProblem(contest_id, problem_no) {
    return callApiForFile(`contests/${contest_id}/problem/${problem_no}`);
}

export function setProblemMetaData(contest_id, problem_no, metadata) {
    return callApi(`contests/${contest_id}/problem/${problem_no}/metadata`, 'post', {
        metadata
    });
}

export function getProblemMetaData(contest_id, problem_no) {
    return callApi(`contests/${contest_id}/problem/${problem_no}/metadata`);
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

export function testCode(code, lang, testcases) {
  callApi(`contests/submit/testCode`, 'post', {
    problem: {code, lang, testcases}
  }).then(res => console.log("Testing code: ", res));
}

export function submitCode(contest_id, team_id, code, lang, number) {
  callApi(`contests/${contest_id}/teams/${team_id}/submit`, 'post', {
    problem: {code, lang, number}
  }).then(res => console.log("submit code: ", res));
}


export function fetchNotMyContests(cuids) {
    // addAccountToTeam("cikqgkv4q01ck7453ualdn3hn", "58a2140af3c57bd14d9f0300", "7");
    // fetchSolvedArrays("cikqgkv4q01ck7453ualdn3hn", "58a2140af3c57bd14d9f0300");
    // fetchProblem("cikqgkv4q01ck7453ualdn3hn", "1");
    // fetchProblem("cikqgkv4q01ck7453ualdn3hn", "7");
    // fetchScoreboardData("cikqgkv4q01ck7453ualdn3hn");
    // submitCode("cikqgkv4q01ck7453ualdn3hn", "58a2140af3c57bd14d9f0300", "print 1", 5, 0);
    startContest("cikqgkv4q01ck7453ualdn3hn");
    // submitCode("cikqgkv4q01ck7453ualdn3hn", "58a2140af3c57bd14d9f0300", "print 6", 5, 1);
    // submitCode("cikqgkv4q01ck7453ualdn3hn", "58a2140af3c57bd14d9f0300", "print 4", 5, 3);
    fetchJudgeMessages('cikqgkv4q01ck7453ualdn3hn');
    // submitCode("cikqgkv4q01ck7453ualdn3hn", "58a2140af3c57bd14d9f0300", "print 4", 5, 2);
    // submitCode("cikqgkv4q01ck7453ualdn3hn", "58a2140af3c57bd14d9f0300", "print 15", 5, 2);
    // submitCode("cikqgkv4q01ck7453ualdn3hn", "58a2140af3c57bd14d9f0300", "compile something!", 5, 2);
    // submitCode("cikqgkv4q01ck7453ualdn3hn", "58a2140af3c57bd14d9f0300", "Another err!", 5, 2);
    fetchSubmissions("cikqgkv4q01ck7453ualdn3hn");
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
