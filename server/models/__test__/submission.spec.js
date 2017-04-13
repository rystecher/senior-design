import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Submission from '../submission';
import Contest from '../contest';
import sinon from 'sinon';
import { connectDB, dropDB } from '../../util/test-helpers';
import * as controller from '../../controllers/contest.controller';
import * as messenger from '../../controllers/messaging.controller';

const contestId1 = 'randomContestId1';
const contestId2 = 'randomContestId2';
const teamId1 = '000000010000000000000000';
const teamId2 = '000000020000000000000000';
const problemName = 'problem one';
const problemNumber = 0;

const submissions = [
    new Submission({
        cuid: 'f34gb2bh24b24b2', teamName: 'team one', teamID: teamId1, contestID: contestId1,
        problemName, problemNumber, correct: false, hadStdError: false, feedback: 'Awaiting feedback from judges...',
        expectedOutputFileName: 'output.txt', actualOutputFileName: 'sub1.txt', code: 'python python',
    }), new Submission({
        cuid: 'f34gb2bh24b24b3', teamName: 'team two', teamID: teamId2, contestID: contestId1,
        problemName, problemNumber, correct: true, hadStdError: false, feedback: 'Your solution was correct',
        expectedOutputFileName: 'output.txt', actualOutputFileName: 'sub2.txt', code: 'python python',
    }), new Submission({
        cuid: 'f34gb2bh24b24b4', teamName: 'team one', teamID: teamId1, contestID: contestId2,
        problemName, problemNumber, correct: true, hadStdError: false, feedback: 'Your solution was correct',
        expectedOutputFileName: 'output.txt', actualOutputFileName: 'sub3.txt', code: 'python python',
    }),
];

test.beforeEach('connect and add three submission entries', t => {
    connectDB(t, () => {
        Submission.create(submissions, err => {
            if (err) t.fail('Unable to create submissions');
        });
        console.log('working');
    });
});

test.afterEach.always(t => {
    dropDB(t);
});

test.serial('Should correctly give number of Submissions', async t => {
    Submission.create(submissions, err => {
        if (err) t.fail('Unable to create submissions');
    });
    const res = await request(app)
    .get(`/api/submissions/${contestId1}/all`)
    .set('Accept', 'application/json');

    t.is(res.status, 200);
    t.is(res.body.submissions.length, 2);
});

test.serial('Should send correct data when queried against a cuid', async t => {
    const spy = sinon.stub(controller, 'readTextFile');
    spy.withArgs('output/output.txt').returns(
        new Promise((resolve, reject) => {
            setTimeout(() => { resolve('expected'); }, 250);
        })
    );
    spy.withArgs('submission/sub3.txt').returns(
        new Promise((resolve, reject) => {
            setTimeout(() => { resolve('actual'); }, 250);
        })
    );
    const cuid = 'f34gb2bh24b24b5';
    const sub = new Submission({
        cuid, teamName: 'team four', teamID: teamId1, contestID: contestId2,
        problemName, problemNumber, correct: true, hadStdError: false, feedback: 'Your solution was correct',
        expectedOutputFileName: 'output.txt', actualOutputFileName: 'sub3.txt', code: 'python python',
    });
    await sub.save();

    const res = await request(app)
    .get(`/api/submissions/${cuid}`)
    .set('Accept', 'application/json');
    const expectedOutput = res.body.expectedOutput;
    t.is(spy.calledTwice, true);
    t.is(res.body.submission.cuid, cuid);
    t.is(expectedOutput, 'expected');
    t.is(res.body.actualOutput, 'actual');
});

test.serial('Should correctly change feedback', async t => {
    const spy = sinon.spy(messenger, 'sendTeamMessage');
    const cuid = 'f34gb2bh24b24b6';
    const sub = new Submission({
        cuid, teamName: 'team four', teamID: teamId1, contestID: contestId2,
        problemName, problemNumber, correct: true, hadStdError: false, feedback: 'Your solution was correct',
        expectedOutputFileName: 'output.txt', actualOutputFileName: 'sub3.txt', code: 'python python',
    });
    await sub.save();
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest', closed: false,
        scoreboardVisible: false, start: 20, teams: [{
            _id: teamId1, name: 'team four', numSolved: 2, score: 50,
            problem_attempts: [{ attempts: ['python python'], solved: false }],
            messagedJudge: false,
        }],
    });
    await contest.save();

    const res = await request(app)
    .post(`/api/submissions/feedback/${cuid}`)
    .send({ correct: true, feedback: 'I changed' })
    .set('Accept', 'application/json');
    t.is(res.status, 200);
    const savedSubmission = await Submission.findOne({ cuid }).exec();
    t.is(savedSubmission.feedback, 'I changed');
    t.is(spy.calledOnce, true);
});

test.serial('Should call markSubmisisonCorrect when feedback is changed to correct', async t => {
    const cuid = 'f34gb2bh24b24b6';
    const sub = new Submission({
        cuid, teamName: 'team four', teamID: teamId1, contestID: contestId2,
        problemName, problemNumber, correct: false, hadStdError: false, feedback: 'Your solution was correct',
        expectedOutputFileName: 'output.txt', actualOutputFileName: 'sub3.txt', code: 'python python',
    });
    await sub.save();
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest', closed: false,
        scoreboardVisible: false, start: 20, teams: [{
            _id: teamId1, name: 'team four', numSolved: 2, score: 50,
            problem_attempts: [{ attempts: ['python python'], solved: false }],
            messagedJudge: false,
        }],
    });
    await contest.save();

    const res = await request(app)
    .post(`/api/submissions/feedback/${cuid}`)
    .send({ correct: true, feedback: 'I changed' })
    .set('Accept', 'application/json');
    t.is(res.status, 200);
    const queriedContest = await Contest.findOne({ cuid: contestId2 }).exec();
    t.is(queriedContest.teams[0].numSolved, 3);
    t.is(queriedContest.teams[0].messages.length, 1);
});

test.serial('Should call mark submisison incorrect when feedback is changed to incorrect', async t => {
    const cuid = 'f34gb2bh24b24b6';
    const sub = new Submission({
        cuid, teamName: 'team four', teamID: teamId1, contestID: contestId2,
        problemName, problemNumber, correct: true, hadStdError: false, feedback: 'Your solution was correct',
        expectedOutputFileName: 'output.txt', actualOutputFileName: 'sub3.txt', code: 'python python',
    });
    await sub.save();
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest', closed: false,
        scoreboardVisible: false, start: 20, teams: [{
            _id: teamId1, name: 'team four', numSolved: 3, score: 50,
            problem_attempts: [{ attempts: ['python python'], solved: false }],
            messagedJudge: false,
        }],
    });
    await contest.save();

    const res = await request(app)
    .post(`/api/submissions/feedback/${cuid}`)
    .send({ correct: false, feedback: 'I changed' })
    .set('Accept', 'application/json');
    t.is(res.status, 200);
    const queriedContest = await Contest.findOne({ cuid: contestId2 }).exec();
    t.is(queriedContest.teams[0].numSolved, 2);
    t.is(queriedContest.teams[0].messages.length, 1);
});

test.serial('Should correctly delete a submission', async t => {
    const cuid = 'f34gb2bh24b24b5';
    const sub = new Submission({
        cuid, teamName: 'team four', teamID: teamId1, contestID: contestId2,
        problemName, problemNumber: 0, correct: false, hadStdError: false, feedback: 'Your solution was correct',
        expectedOutputFileName: 'output.txt', actualOutputFileName: 'sub3.txt', code: 'python python',
    });
    await sub.save();
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest', closed: false,
        scoreboardVisible: false, teams: [{
            _id: teamId1, name: 'team four', numSolved: 0, score: 0,
            problem_attempts: [{ attempts: ['python python'], solved: false }],
            messagedJudge: false,
        }],
    });
    await contest.save();
    const res = await request(app)
    .delete(`/api/submissions/${cuid}`)
    .set('Accept', 'application/json');
    t.is(res.status, 200);
    const queriedPost = await Submission.findOne({ cuid }).exec();
    t.is(queriedPost, null);
});
