import User from '../models/user';
import Contest from '../models/contest';

export function createContest(username, cuid) {
    User.findOne({ username }, (err, user) => {
        if (err) {
            return cb(err);
        } else if (user) {
            user.createdContestsID.push(cuid);
            user.save();
        }
    });
}

export function joinContest(username, cuid, teamid) {
    User.findOne({ username }, (err, user) => {
        if (err) {
            return cb(err);
        } else if (user) {
            user.participatedContestsID.push({
                contest: cuid,
                team: teamid,
            });
            user.save();
        }
    });
}

export function getCreatedContests(req, res) {
    if (!req.params.username) {
        res.status(403).end();
    } else {
        User.findOne({username: req.params.username}, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else if (!user) {
                res.status(400).send(err);
            } else {
                Contest.find({ cuid: { $in: user.createdContestsID }}, {_id: 0})
            .select('name admin closed cuid')
            .exec((err, contests) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                  // console.log(contests);
                    res.json({ contests });
                }
            });
            }
        });
    }
}

export function getJoinedContests(req, res) {
    if (!req.params.username) {
        res.status(403).end();
    } else {
        User.findOne({username: req.params.username}, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else if (!user) {
                res.status(400).send(err);
            } else {
                //console.log(user.participatedContestsID);
                const participatedContestsList = [];
                if (user.participatedContestsID) {
                    for (let i = 0; i < user.participatedContestsID.length; i++) {
                        participatedContestsList.push(user.participatedContestsID[i].contest);
                  }
                }
                //console.log(participatedContestsList);

                Contest.find({ cuid: { $in: participatedContestsList }}, {_id: 0})
                .select('name admin closed cuid')
                .exec((err, contests) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        //console.log(contests);
                        res.json({ contests });
                    }
                });
            }
        });
    }
}

export function getJoinableContests(req, res) {
    if (!req.params.username) {
        res.status(403).end();
    } else {
        User.findOne({username: req.params.username}, (err, user) => {
            if (err) {
              res.status(500).send(err);
            } else if (!user) {
              res.status(400).send(err);
            } else {
            //console.log(user.participatedContestsID);
            const participatedContestsList = [];
            if (user.participatedContestsID) {
              for (let i = 0; i < user.participatedContestsID.length; i++) {
                participatedContestsList.push(user.participatedContestsID[i].contest);
              }
            }
            //console.log(participatedContestsList);
            // { qty: { $nin: [ 5, 15 ] } }

            Contest.find(
              { cuid: { $nin: [participatedContestsList, user.createdContestsID] }}, {_id: 0})
            .select('name admin closed cuid')
            .exec((err, contests) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                  // console.log(contests);
                    res.json({ contests });
                }
            });
            }
        });
    }
}

export function getUserRole(req, res) {
    if (!req.params.contestId || !req.params.username) {
        res.status(403).end();
    } else {
        User.findOne({ username: req.params.username }, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else if (!user) {
                res.status(400).send(err);
            } else if (user.createdContestsID.indexOf(req.params.contestId) !== -1) {
                res.json({ userRole: 'admin' });
            } else {
                const contest = user.participatedContestsID.find((elm) => {
                    return elm.contest === req.params.contestId;
                });
                if (contest) {
                    res.json({ userRole: 'participant', teamId: contest.team });
                } else {
                    res.json({ userRole: 'none' });
                }
            }
        });
    }
}
