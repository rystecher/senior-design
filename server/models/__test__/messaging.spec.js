import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Contest from '../contest';
import { connectDB, dropDB } from '../../util/test-helpers';

const contestId2 = 'randomContestId2';
const teamId1 = '000000010000000000000000';
const teamId2 = '000000020000000000000000';
const teams = [{
    _id: teamId1, name: 'team four', numSolved: 0, score: 0,
    problem_attempts: [{ attempts: ['python python'], solved: false }],
    messagedJudge: false,
}, {
    _id: teamId2, name: 'team two', numSolved: 0, score: 0,
    problem_attempts: [{ attempts: ['python python'], solved: false }],
    messagedJudge: true,
}];

test.beforeEach('connect to database', t => {
    connectDB(t, () => {
        console.log('working');
    });
});

test.afterEach.always(t => {
    dropDB(t);
});

test.serial('Get messages should return status 400 for invalid contest', async t => {
    const res = await request(app)
    .get(`/api/messages/${contestId2}/team/${teamId2}/forjudge`)
    .set('Accept', 'application/json');
    t.is(res.status, 400);
});

test.serial('Messaged judge flag should be false before a team messages a judge', async t => {
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest',
        closed: false, scoreboardVisible: false, teams,
    });
    await contest.save();
    const contestQuery = await Contest.findOne({ cuid: contestId2 }).exec();
    const messagedJudge = contestQuery.teams[0].messagedJudge;
    t.is(messagedJudge, false);
});

test.serial('Messaged judge flag should be true after a team messages a judge', async t => {
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest',
        closed: false, scoreboardVisible: false, teams,
    });
    await contest.save();

    const res = await request(app)
    .post(`/api/messages/${contestId2}/team/${teamId1}/tojudge`)
    .send({ message: 'here is a message' })
    .set('Accept', 'application/json');

    t.is(res.status, 200);
    const contestQuery = await Contest.findOne({ cuid: contestId2 }).exec();
    const messagedJudge = contestQuery.teams[0].messagedJudge;
    t.is(messagedJudge, true);
});

test.serial('Messaged judge flag should be false after judge requests messages', async t => {
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest',
        closed: false, scoreboardVisible: false, teams,
    });
    await contest.save();
    const contestQueryA = await Contest.findOne({ cuid: contestId2 }).exec();
    const messagedJudgeA = contestQueryA.teams[1].messagedJudge;
    t.is(messagedJudgeA, true);

    const res = await request(app)
    .get(`/api/messages/${contestId2}/team/${teamId2}/forjudge`)
    .set('Accept', 'application/json');

    t.is(res.status, 200);
    const contestQueryB = await Contest.findOne({ cuid: contestId2 }).exec();
    const messagedJudgeB = contestQueryB.teams[1].messagedJudge;
    t.is(messagedJudgeB, false);
});

test.serial('Judge request for messages should return an empty array if there are no messages', async t => {
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest',
        closed: false, scoreboardVisible: false, teams,
    });
    await contest.save();

    const res = await request(app)
    .get(`/api/messages/${contestId2}/team/${teamId2}/forjudge`)
    .set('Accept', 'application/json');

    t.is(res.status, 200);
    t.is(res.body.messages.length, 0);
});

test.serial('Judge request for messages should return an array of message objects', async t => {
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest',
        closed: false, scoreboardVisible: false, teams,
    });
    await contest.save();

    const message = 'Omnis vir lupus';
    await request(app)
    .post(`/api/messages/${contestId2}/team/${teamId1}/tojudge`)
    .send({ message })
    .set('Accept', 'application/json');

    const res2 = await request(app)
    .get(`/api/messages/${contestId2}/team/${teamId1}/forjudge`)
    .set('Accept', 'application/json');

    t.is(res2.status, 200);
    t.is(res2.body.messages.length, 1);
    t.is(res2.body.messages[0].message, message);
});

test.serial('Messaged judge array should be empty array for contest without teams', async t => {
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest',
        closed: false, scoreboardVisible: false,
    });
    await contest.save();

    const res = await request(app)
    .get(`/api/messages/${contestId2}/judge`)
    .set('Accept', 'application/json');

    t.is(res.status, 200);
    t.is(res.body.teams.length, 0);
});

test.serial('Messaged judge array should have an entry for each team', async t => {
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest',
        closed: false, scoreboardVisible: false, teams,
    });
    await contest.save();

    const res = await request(app)
    .get(`/api/messages/${contestId2}/judge`)
    .set('Accept', 'application/json');

    t.is(res.status, 200);
    t.is(res.body.teams.length, teams.length);
});

test.serial('Messaged judge array entries should be objects with messaged judge property', async t => {
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest',
        closed: false, scoreboardVisible: false, teams,
    });
    await contest.save();

    const res = await request(app)
    .get(`/api/messages/${contestId2}/judge`)
    .set('Accept', 'application/json');

    t.is(res.status, 200);
    t.is(res.body.teams[0].messagedJudge, teams[0].messagedJudge);
    t.is(res.body.teams[1].messagedJudge, teams[1].messagedJudge);
});

test.serial('Broadcast message should add a message to each team in the contest', async t => {
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest',
        closed: false, scoreboardVisible: false, teams,
    });
    await contest.save();
    const contestQueryA = await Contest.findOne({ cuid: contestId2 }).exec();
    const numMessageArrayA = contestQueryA.teams.map((team) => team.messages.length + 1);

    const res = await request(app)
    .post(`/api/messages/${contestId2}/broadcast`)
    .send({ message: 'here is a message' })
    .set('Accept', 'application/json');

    t.is(res.status, 200);
    const contestQueryB = await Contest.findOne({ cuid: contestId2 }).exec();
    const numMessageArrayB = contestQueryB.teams.map((team) => team.messages.length);
    const equal = numMessageArrayB.every((elm, idx) => elm === numMessageArrayA[idx]);
    t.is(equal, true);
});

test.serial('Broadcast message should add a message to the contests broadcastMessages array', async t => {
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest',
        closed: false, scoreboardVisible: false, teams,
    });
    await contest.save();
    const contestQueryA = await Contest.findOne({ cuid: contestId2 }).exec();
    const numBroadcastMessagesA = contestQueryA.broadcastMessages.length;

    const message = 'hic sunt leones';
    const res = await request(app)
    .post(`/api/messages/${contestId2}/broadcast`)
    .send({ message })
    .set('Accept', 'application/json');

    t.is(res.status, 200);

    const contestQueryB = await Contest.findOne({ cuid: contestId2 }).exec();
    const numBroadcastMessagesB = contestQueryB.broadcastMessages.length;

    t.is(numBroadcastMessagesA + 1, numBroadcastMessagesB);
    t.is(contestQueryB.broadcastMessages.pop().message, message);
});

test.serial('broadcastMessages should be an empty array for a new contest', async t => {
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest',
        closed: false, scoreboardVisible: false, teams,
    });
    await contest.save();

    const res = await request(app)
    .get(`/api/messages/${contestId2}/broadcast`)
    .set('Accept', 'application/json');

    t.is(res.status, 200);
    t.is(res.body.messages.length, 0);
});

test.serial('broadcastMessages should be an array of message objects that contains messages that were broadcasted', async t => {
    const contest = new Contest({
        cuid: contestId2, slug: 'new-contest', name: 'New Contest',
        closed: false, scoreboardVisible: false, teams,
    });
    await contest.save();

    const message = 'hic sunt leones';
    const res = await request(app)
    .post(`/api/messages/${contestId2}/broadcast`)
    .send({ message })
    .set('Accept', 'application/json');

    t.is(res.status, 200);

    const res2 = await request(app)
    .get(`/api/messages/${contestId2}/broadcast`)
    .set('Accept', 'application/json');

    t.is(res2.status, 200);
    t.is(res2.body.messages.length, 1);
    t.is(res2.body.messages[0].message, message);
});
