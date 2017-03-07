import callApi from '../../../../util/apiCaller';

export function testCode(code, lang, number) {
  callApi(`contests/${contest_id}/teams/${team_id}/submit`, 'post', {
    problem: {code, lang, number}
  }).then(res => console.log("submit code: ", res));
}

export function submitCode(contest_id, team_id, code, lang, number) {
  callApi(`contests/${contest_id}/teams/${team_id}/submit`, 'post', {
    problem: {code, lang, number}
  }).then(res => console.log("submit code: ", res));
}
