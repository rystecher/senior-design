import callApi, { callApiForFile } from '../util/apiCaller';

export function addContestRequest(contest) {
    return callApi('contests', 'post', contest);
}

export function createContest(contest) {
    return callApi('contests', 'post', { contest });
}

export function joinContest(contestId, username) {
    return callApi(`contests/${contestId}/join`, 'post', {
        username,
    });
}

export function addAccountToTeam(contestId, teamId, account_id) {
    callApi(`contests/${contestId}/teams/${teamId}`, 'post', {
        account_id,
    }).then(res => console.log(res));
}

export function getContestInfo(contestId) {
    return callApi(`contests/${contestId}/info`);
}

export function hasNewMessage(contestId) {
    return callApi(`messages/${contestId}/new`);
}

export function updateContestInfo(contestId, info) {
    return callApi(`contests/${contestId}/info`, 'post', { info });
}

export function getScoreboardData(contestId) {
    return callApi(`contests/${contestId}/scoreboard`);
}

export function hideScoreboard(contestId) {
    return callApi(`contests/${contestId}/scoreboard/hide`, 'post', {});
}

export function showScoreboard(contestId) {
    return callApi(`contests/${contestId}/scoreboard/show`, 'post', {});
}

export function getSolvedBy(contestId) {
    return callApi(`contests/${contestId}/scoreboard/solvedBy`);
}

export function getNumberOfProblems(contestId) {
    return callApi(`contests/${contestId}/number_of_problems`);
}

export function openContest(contestId) {
    return callApi(`contests/${contestId}/open`, 'post', { start: true });
}

export function closeContest(contestId) {
    return callApi(`contests/${contestId}/close`, 'post', { close: true });
}

export function sendMessageToJudge(contestId, teamId, message) {
    return callApi(`messages/${contestId}/team/${teamId}/tojudge`, 'post', {
        message,
    });
}

export function sendMessageToTeam(contestId, teamId, message) {
    return callApi(`messages/${contestId}/team/${teamId}`, 'post', {
        message,
    });
}

export function sendBroadcastMessage(contestId, message) {
    return callApi(`messages/${contestId}/broadcast`, 'post', {
        message,
    });
}

export function getTeamMessages(contestId, teamId) {
    return callApi(`messages/${contestId}/team/${teamId}`).then(res => {
        return res.messages;
    });
}

export function getTeamMessagesForJudge(contestId, teamId) {
    return callApi(`messages/${contestId}/team/${teamId}/forjudge`).then(res => {
        return res.messages;
    });
}

export function getBroadcastMessages(contestId) {
    return callApi(`messages/${contestId}/broadcast`).then(res => {
        return res.messages;
    });
}

export function getUserRole(contestId, username) {
    return callApi(`users/${username}/contest/${contestId}/role`);
}

export function fetchJudgeMessages(contestId) {
    return callApi(`messages/${contestId}/judge`).then(res => {
        return res.teams;
    });
}

export function fetchSolvedArrays(contestId, teamId) {
    return callApi(`contests/${contestId}/teams/${teamId}/solved`);
}

export function fetchSubmissions(contestId) {
    return callApi(`submissions/${contestId}/all`).then(res => {
        return res.submissions;
    });
}

export function sendFeedback(submissionId, req) {
    return callApi(`submissions/feedback/${submissionId}`, 'post', req).then(res => {
        console.log('Sending feedback..' + res);
    });
}

export function getSubmission(submissionId) {
    return callApi(`submissions/${submissionId}`).then(res => {
        return res;
    });
}

export function deleteSubmission(submissionId) {
    return callApi(`submissions/${submissionId}`, 'delete').then(res => {
        console.log('deleting submission..' + res);
    });
}

export function fetchSubmissionsForTeam(contestId, teamId) {
    return callApi(`submissions/${contestId}/${teamId}/all`);
}

export function getCodeForSubmission(contestId, teamId, submissionId) {
    return callApi(`submissions/${contestId}/${teamId}/${submissionId}`);
}

export function fetchProblem(contestId, problemNum) {
    return callApiForFile(`contests/${contestId}/problem/${problemNum}`);
}

export function deleteProblem(contestId, problemNum) {
    return callApiForFile(`contests/${contestId}/problem/${problemNum}`, 'delete');
}

export function setProblemMetaData(contestId, problemNum, metadata) {
    return callApi(`contests/${contestId}/problem/${problemNum}/metadata`, 'post', {
        metadata,
    });
}

export function getProblemMetaData(contestId, problemNum) {
    return callApi(`contests/${contestId}/problem/${problemNum}/metadata`);
}

export function testCode(contestId, teamId, code, lang, testcases) {
    return callApi(`contests/${contestId}/teams/${teamId}/submit/testCode`, 'post', {
        problem: { code, lang, testcases },
    }).then(res => true);
}

export function submitCode(contestId, teamId, code, lang, number) {
    return callApi(`contests/${contestId}/teams/${teamId}/submit`, 'post', {
        problem: { code, lang, number },
    }).then(res => true);
}
