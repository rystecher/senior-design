import User from '../models/user';

export function addContestToCreatedContestsID(username, cuid) {
    User.findOne({ username }, (err, user) => {
        if (err) {
            return cb(err);
        } else {
            user.createdContestsID.push(cuid);
            user.save();
        }
    });
}
export function joinContest(username, cuid, teamid) {
    User.findOne({ username }, (err, user) => {
        if (err) {
            return cb(err);
        } else {
            user.participatedContestsID.push({
                contest: cuid,
                team: teamid,
            });
            user.save();
        }
    });
}
