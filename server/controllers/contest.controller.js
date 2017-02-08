import Contest, {Team} from '../models/contest';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all contests
 * @param req
 * @param res
 * @returns void
 */
export function getContests(req, res) {
  Contest.find().exec((err, contests) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ contests });
  });
}

/**
 * Save a contest
 * @param req
 * @param res
 * @returns void
 */
export function addContest(req, res) {
    if (!req.body.contest.name || !req.body.contest.adminList) {
        res.status(403).end();
    }
    req.body.contest.teams = [];
    const newContest = new Contest(req.body.contest);

    // Let's sanitize inputs
    newContest.name = sanitizeHtml(newContest.name);

    newContest.slug = slug(newContest.name.toLowerCase(), { lowercase: true });
    newContest.cuid = cuid();
    newContest.save((err, saved) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ contest: saved });
    });
}

/**
 * Add a team to a contest
 * TODO: add password
 * @param req
 * @param res
 * @returns void
 */
export function addTeamToContest(req, res) {
    if (!req.body.team.name || !req.params.contest_id || !req.body.team.memberList) {
        res.status(403).end();
    }

    const newTeam = new Team(req.body.team);

    // Let's sanitize inputs
    newTeam.name = sanitizeHtml(newTeam.name);
    newTeam.slug = slug(newTeam.name.toLowerCase(), { lowercase: true });
    newTeam.cuid = cuid();
    let teamNameConflict = false;
    Contest.findOne({cuid: req.params.contest_id}).select('teams').exec((err, contest) => {
        if (err) {
            res.status(500).send(err);
        }
        contest.teams.forEach(team => {
            if (team.name == newTeam.name) {
                teamNameConflict = true;
            }
        });
        if (teamNameConflict) {
            const nameConflictError = {error: "TEAM_NAME_CONFLICT"};
            res.json({ nameConflictError });
        } else {
            Contest.findOneAndUpdate({cuid: req.params.contest_id},
                {$push: {teams: newTeam}}, (err, saved) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    //console.log(saved);
                    res.json({ team: saved });
                }
            );
        }
    });
}

/**
 * Add a new member to a team
 * TODO: add password
 * @param req
 * @param res
 * @returns void
 */
export function addAccountToTeam(req, res) {
    if (!req.params.contest_id || !req.params.team_id || !req.body.account_id) {
        res.status(403).end();
    }

    Contest.findOneAndUpdate({
            cuid: req.params.contest_id,
            'teams.cuid': req.params.team_id,
        }, {'teams.memberList': {$push: req.body.account_id}}, (err, saved) => {
            if (err) {
                res.status(500).send(err);
            }
            //console.log(saved);
            res.json({ team: saved });
        }
    );
}

/**
 * Get a single contest
 * @param req
 * @param res
 * @returns void
 */
export function getContest(req, res) {
    Contest.findOne({ cuid: req.params.cuid }).exec((err, contest) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ contest });
    });
}

/**
 * Returns an array of teams
 * @param req
 * @param res
 * @returns void
 */
export function getTeamScores(req, res) {
    Contest.findOne({ cuid: req.params.cuid }).select('teams').exec((err, contest) => {
        if (err) {
            res.status(500).send(err);
        }
        const teamNames = contest.teams.map(team => {
            return (team.name);
        })
        const teamScores = contest.teams.map(team => {
            return (team.score);
        })
        const teamTimestamps = contest.teams.map(team => {
            return (team.timestamp);
        })
        const teams = {
            teamNames: teamNames,
            teamScores: teamScores,
            teamTimestamps: teamTimestamps,
        };
        res.json({ teams });
    });
}

/**
 * Get all contest that match an array of IDs
 * Used to display list of my contests
 * @param req
 * @param res
 * @returns void
 */
export function getContestsFromIds(req, res) {
    Contest.find({ cuid: {$in: req.params.cuids }}).select('name cuid slug start').exec((err, contests) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ contests });
    });
}

/**
 * Get all contest that do not match any of an array of IDs
 * Used to display list of contests to join
 * @param req
 * @param res
 * @returns void
 */
export function getContestsNotInIds(req, res) {
    Contest.find({ cuid: {$nin: req.params.cuids }}).select('name cuid slug start').exec((err, contests) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ contests });
    });
}

/**
 * Delete a contest
 * @param req
 * @param res
 * @returns void
 */
export function deleteContest(req, res) {
  Contest.findOne({ cuid: req.params.cuid }).exec((err, contest) => {
    if (err) {
      res.status(500).send(err);
    }
    contest.remove(() => {
      res.status(200).end();
    });
  });
}
