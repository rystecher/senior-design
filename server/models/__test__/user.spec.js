import test from 'ava';
import request from 'supertest';
import app from '../../server';
import User from '../user';
import { connectDB, dropDB } from '../../util/test-helpers';

test.beforeEach('connect to database', t => {
    connectDB(t, () => {
        console.log('working');
    });
});

test.afterEach.always(t => {
    dropDB(t);
});

test.serial('Get user role should return none if contestId is in createdContestIds or participatedContestsID', async t => {
    const user = new User({
        username: 'user1',
        password: 'password1',
    });
    await user.save();
    const contestId = 'randomContestId';

    const res = await request(app)
    .get(`/api/users/user1/contest/${contestId}/role`)
    .set('Accept', 'application/json');

    t.is(res.status, 200);
    t.is(res.body.userRole, 'none');
});

test.serial('Get user role should return admin if contestId is in createdContestIds', async t => {
    const contestId = 'randomContestId';
    const user = new User({
        username: 'user1',
        password: 'password1',
        createdContestsID: [contestId],
    });
    await user.save();

    const res = await request(app)
    .get(`/api/users/user1/contest/${contestId}/role`)
    .set('Accept', 'application/json');

    t.is(res.status, 200);
    t.is(res.body.userRole, 'admin');
});

test.serial('Get user role should return participant if contestId is in participatedContestsID and the associated teamId', async t => {
    const contestId = 'randomContestId';
    const teamId = 'randomTeamId';
    const user = new User({
        username: 'user1',
        password: 'password1',
        participatedContestsID: [{ contest: contestId, team: teamId }],
    });
    await user.save();

    const res = await request(app)
    .get(`/api/users/user1/contest/${contestId}/role`)
    .set('Accept', 'application/json');

    t.is(res.status, 200);
    t.is(res.body.userRole, 'participant');
    t.is(res.body.teamId, teamId);
});

test.serial('Get user role should return status 400 if user does not exist', async t => {
    const res = await request(app)
    .get('/api/users/user1/contest/anyContestId/role')
    .set('Accept', 'application/json');
    t.is(res.status, 400);
});
