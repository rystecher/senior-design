import Contest from '../models/contest';

export function sendTeamMessageApi(req, res) {
    const {contest_id, team_id} = req.params;
    if (!contest_id || !team_id || !req.body.message) {
        res.status(403).end();
    } else {
        sendTeamMessage(req.body.message, contest_id, team_id);
        res.json({success: true});
    }
}

export function getTeamMessages(req, res) {
    if (!req.params.contest_id || !req.params.team_id) {
        res.status(403).end();
    } else {
        Contest.findOne({cuid: contest_id}, (err, contest) => {
            if (err) {
                res.status(500).send(err);
            } else {
                const team = contest.teams.id(req.params.team_id);
                if (team == null) {
                    res.status(500).send(err);
                } else {
                    res.json({ messages: team.messages});
                }
            }
        });
    }
}

export function broadcastMessage(req, res) {
    if (!req.params.contest_id || !req.body.message) {
        res.status(403).end();
    } else {
        Contest.findOne({ cuid: req.params.cuid }).select('teams').exec((err, contest) => {
            if (err) {
                res.status(500).send(err);
            } else {
                contest.teams.forEach(team => {
                    team.messages.push(req.body.message);
                });
                contest.save((err) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json({ success: true });
                    }
                });
            }
        });
    }
}

export function sendTeamMessage(message, contest_id, team_id) {
    Contest.findOne({cuid: contest_id}, (err, contest) => {
        if (err) {
            res.status(500).send(err);
        }
        const team = contest.teams.id(req.params.team_id);
        team.messages.push(message);
        team.save((err) => err == null);
    });
}
