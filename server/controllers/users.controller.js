import User from '../models/user';
import * as ContestController from './contest.controller.js'

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
  //console.log(req.body);
  User.findOne({username: req.body.username}, (err, user) => {
      if (err) {
        res.status(403).end();
      } else {
        var contests = [];
        var contests_ids = user.createdContestsID;
        for (var i = 0; i < user.createdContestsID.length; i++) {
          console.log(contests_ids[i]);
          ContestController.getContest(contests_ids[i], function(err, contest){
            if (err) {
              res.status(403).end();
            } else{
              //console.log(contest);
              contests.push(contest);
            }
          });
        }
        console.log(contests);
        res.json({contests})
      }
  });
}

export function getJoinedContests(req, res) {
  User.findOne({username: req.params.username}, (err, user) => {
      if (err) {
        return cb(err);
      } else {
        res.json({ participatedContestsID: user.participatedContestsID })
      }
  });
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
