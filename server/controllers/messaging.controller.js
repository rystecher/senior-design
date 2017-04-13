import Contest from '../models/contest';

export function sendTeamMessageApi(req, res) {
    const { contestId, teamId } = req.params;
    if (!contestId || !teamId || !req.body.message) {
        res.status(403).end();
    } else {
        sendTeamMessage({ from: 'Judges', message: req.body.message }, contestId, teamId, res);
    }
}

export function sendJudgeMessage(req, res) {
    const { contestId, teamId } = req.params;
    if (!contestId || !teamId || !req.body.message) {
        res.status(403).end();
    } else {
        sendTeamMessage({ from: 'Team', message: req.body.message }, contestId, teamId, res);
    }
}

export function getTeamMessages(req, res) {
    if (!req.params.contestId || !req.params.teamId) {
        res.status(403).end();
    } else {
        Contest.findOne({ cuid: req.params.contestId }, (err, contest) => {
            if (err) {
                res.status(500).send(err);
            } else if (!contest) {
                res.status(400).send({ err: 'Contest does not exist' });
            } else {
                const team = contest.teams.id(req.params.teamId);
                if (!team) {
                    res.status(500).send(err);
                } else {
                    res.json({ messages: team.messages });
                }
            }
        });
    }
}

export function getTeamMessagesForJudge(req, res) {
    if (!req.params.contestId || !req.params.teamId) {
        res.status(403).end();
    } else {
        Contest.findOne({ cuid: req.params.contestId }, (err, contest) => {
            if (err) {
                res.status(500).send(err);
            } else if (!contest) {
                res.status(400).send({ err: 'Contest does not exist' });
            } else {
                const team = contest.teams.id(req.params.teamId);
                if (!team) {
                    res.status(500).send(err);
                } else {
                    team.messagedJudge = false;
                    contest.save();
                    res.json({ messages: team.messages });
                }
            }
        });
    }
}

export function getJudgeMessages(req, res) {
    if (!req.params.contestId) {
        res.status(403).end();
    } else {
        Contest.findOne({ cuid: req.params.contestId }, (err, contest) => {
            if (err) {
                res.status(500).send(err);
            } else if (!contest) {
                res.status(400).send({ err: 'Contest does not exist' });
            } else {
                const teams = contest.teams.map(team => {
                    return {
                        name: team.name,
                        messagedJudge: team.messagedJudge,
                        id: team._id,
                    };
                });
                res.json({ teams });
            }
        });
    }
}

export function sendBroadcastMessage(req, res) {
    if (!req.params.contestId || !req.body.message) {
        res.status(403).end();
    } else {
        Contest.findOne({ cuid: req.params.contestId }).select('teams broadcastMessages').exec((err, contest) => {
            if (err) {
                res.status(500).send(err);
            } else if (!contest) {
                res.status(400).send({ err: 'Contest does not exist' });
            } else {
                contest.teams.forEach(team => {
                    team.messages.push({ from: 'Judges', message: 'Broadcast: ' + req.body.message });
                });
                contest.broadcastMessages.push({ from: 'Judges', message: req.body.message });
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

export function getBroadcastMessages(req, res) {
    if (!req.params.contestId) {
        res.status(403).end();
    } else {
        Contest.findOne({ cuid: req.params.contestId }).select('broadcastMessages').exec((err, contest) => {
            if (err) {
                res.status(500).send(err);
            } else if (!contest) {
                res.status(400).send({ err: 'Contest does not exist' });
            } else {
                res.json({ messages: contest.broadcastMessages });
            }
        });
    }
}

export function sendTeamMessage(message, contestId, teamId, res) {
    Contest.findOne({ cuid: contestId }).select('teams').exec((err, contest) => {
        if (err) {
            if (res) {
                res.status(500).send(err);
            }
        } else if (!contest) {
            if (res) {
                res.status(400).send({ err: 'Contest does not exist' });
            }
        } else {
            const team = contest.teams.id(teamId);
            if (!team) {
                if (res) {
                    res.status(400).send({ err: 'Team does not exist' });
                }
            } else {
                team.messages.push(message);
                if (message.from === 'Team') {
                    team.messagedJudge = true;
                    contest.newMessage = teamId;
                }
                contest.save((err2) => {
                    if (res) {
                        if (err2) {
                            res.status(500).send(err2);
                        } else {
                            res.json({ success: true });
                        }
                    }
                });
            }
        }
    });
}

export function hasNewMessage(req, res) {
    if (!req.params.contestId) {
        res.status(403).end();
    } else {
        Contest.findOne({ cuid: req.params.contestId }).select('newMessage').exec((err, contest) => {
            if (err) {
                res.status(500).send(err);
            } else if (!contest) {
                res.status(400).send({ err: 'Contest does not exist' });
            } else if (contest.newMessage === 'none') {
                res.json({ newMessage: false });
            } else {
                const newMessage = contest.newMessage;
                contest.newMessage = 'none';
                contest.save(() => res.json({ newMessage }));
            }
        });
    }
}
