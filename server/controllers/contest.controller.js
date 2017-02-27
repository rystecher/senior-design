import Contest, {Team, TeamProblem} from '../models/contest';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import fs from 'fs'; // for reading and writing problem pdfs
import {hackerrankCall} from './hackerRank.controller';

// TODO get problem file, add judge,
// modify contest after it started

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
export function createContest(req, res) {
    if (!req.body.contest.name || !req.body.contest.admin) {
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
    let teamNameConflict = false;
    Contest.findOne({cuid: req.params.contest_id}).select('teams').exec((err, contest) => {
        if (err) {
            res.status(500).send(err);
        }
        if (contest.teams.findIndex(team => team.name === newTeam.name) !== -1) {
            res.json({ err: "TEAM_NAME_CONFLICT"});
        } else {
            const teamProblems = Array(contest.problems.length).fill({
              solved: false, attempFileNames: []
            });
            newTeam.problem_attempts = teamProblems;
            contest.teams.push(newTeam);
            contest.save((err, saved) => {
                if (err) {
                    res.status(500).send(err);
                }
                //console.log(saved);
                res.json({ team: saved });
            });
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
    Contest.findOne({cuid: req.params.contest_id}, (err, contest) => {
        if (err) {
            res.status(500).send(err);
        }
        const team = contest.teams.id(req.params.team_id);
        if (team.memberList.indexOf(req.body.account_id) == -1) {
            team.memberList.push(req.body.account_id);
            contest.save((err, saved) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.json({ contest: saved });
            })
        } else {
            res.json({ err: "ACCOUNT_ALREADY_ON_TEAM"});
        }
    });
}

/**
 * Add a problem to a team
 * @param req
 * @param res
 * @returns void
 */
export function addProblemAttempt(req, res) {
    if (!req.params.contest_id || !req.params.team_id || !req.body.problem) {
        res.status(403).end();
    }
    const {number, code, lang} = req.body.problem;
    Contest.findOne({cuid: req.params.contest_id}, (err, contest) => {
        if (err) {
            res.status(500).send(err);
        }
        const team = contest.teams.id(req.params.team_id);
        const problem = contest.teams.id(req.params.team_id).problem_attempts[number];
        if (problem.solved || problem.attempts.indexOf(code) != -1) {
            // Problem is already solved do nothing
        } else {
            console.log("Test cases: ", contest.problems[number].testCases.input);
            hackerrankCall(code, lang, contest.problems[number].testCases.input);
            // problem.attempts.push(code);
            // problem.solved = solved;
            // if (problem.solved) {
            //     problem.timestamp = new Date();
            //     team.score += 5; // need to calculate new score based on attemps
            //     if(!contest.problems[number].solved) {
            //         contest.problems[number].solved = true;
            //         contest.problems[number].solvedBy = req.params.team_id;
            //         // alert judges
            //     }
            // }
        }
        contest.save((err, saved) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ contest: saved });
        })
    });
}

/**
 * Sends the solved arrays for the contest
 * specified by id and team specified by id
 * both parameters are passed in req.params
 *
 * Response format:
 * solved:
 *      solvedInContest: [Boolean]
 *      solvedByTeam: [Boolean]
 * @param req
 * @param res
 * @returns void
 */
export function getSolvedArrays(req, res) {
    if (!req.params.contest_id || !req.params.team_id) {
        res.status(403).end();
    }
    Contest.findOne({ cuid: req.params.contest_id }).exec((err, contest) => {
        if (err) {
            res.status(500).send(err);
        }
        const solvedInContest = contest.problems.map((problem) => problem.solved);
        const team = contest.teams.id(req.params.team_id);
        const solvedByTeam = team.problem_attempts.map((problem) => problem.solved);
        res.json({ solved: {solvedInContest, solvedByTeam}});
    });
}

/**
 * Sends the problem file requested
 * @param req
 * @param res
 * @returns void
 */
export function getProblemFile(req, res) {
    if (!req.params.contest_id || !req.params.problem_no) {
        res.status(403).end();
    }
    const problem_no = req.params.problem_no;
    Contest.findOne({ cuid: req.params.contest_id }).exec((err, contest) => {
        if (err) {
            res.status(500).send(err);
        }
        if (problem_no < contest.problems.length) {
            //const fileName = contest.problems[problem_no].fileName;
            const fileName = "test.pdf";
            //const fileName = "test.txt";
            const file = fs.createReadStream(fileName);
            const stat = fs.statSync(fileName);
            res.setHeader('Content-Length', stat.size);
            if(fileName.endsWith("pdf")) {
                res.setHeader('Content-Type', 'application/pdf');
            } else {
                res.setHeader('Content-Type', 'application/text');
            }
            res.setHeader('Content-Disposition', `attachment; filename=problem${problem_no}.pdf`);
            file.pipe(res);
        } else {
            res.json({err: "Invalid problem number"});
        }
    });
}

/**
 * Creates a new problem for a contest given a pdf file
 * @param req
 * @param res
 * @returns void
 */
export function createProblem(req, res) {
    if (!req.params.contest_id || !req.params.filename) {
        res.status(403).end();
    }
    Contest.findOne({ cuid: req.params.contest_id }).exec((err, contest) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const fileName = 'pdfs/' + req.params.filename + '.pdf';
            contest.problems.push({ name: fileName, fileName });
            const stream = fs.createWriteStream(fileName);
            stream.on('open', () => {
                req.pipe(stream);
                res.json({ success: true });
            });
            contest.save();
        }
    });
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
 * Sends an array of teams
 *
 * Response format:
 * teams:
 *      teamNames: [Strings]
 *      teamScores: [Numbers]
 *      teamTimestamps: [Dates]
 * @param req
 * @param res
 * @returns void
 */
export function getTeamScores(req, res) {
    Contest.findOne({ cuid: req.params.cuid }).select('teams').exec((err, contest) => {
        if (err) {
            res.status(500).send(err);
        }
        if (contest == null) {
            console.log("null contest");
        }
        const teamNames = contest.teams.map(team => team.name);
        const teamScores = contest.teams.map(team => team.score);
        const teamTimestamps = contest.teams.map(team => team.timestamp);
        res.json({ teams: {teamNames, teamScores, teamTimestamps} });
    });
}

/**
 * Toggles the scoreboard visibility
 * @param req
 * @param res
 * @returns void
 */
export function hideScoreboard(req, res) {
    if (!req.params.contest_id) {
        res.status(403).end();
    }

    Contest.findOne({cuid: req.params.contest_id}).exec((err, contest) => {
        if (err) {
            res.status(500).send(err);
        }
        contest.scoreboardVisible = false;
        contest.save((err, saved) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ success: true });
        });
    });
}

/**
 * Toggles the scoreboard visibility
 * @param req
 * @param res
 * @returns void
 */
export function showScoreboard(req, res) {
    if (!req.params.contest_id) {
        res.status(403).end();
    }

    Contest.findOne({cuid: req.params.contest_id}).exec((err, contest) => {
        if (err) {
            res.status(500).send(err);
        }
        contest.scoreboardVisible = true;
        contest.save((err, saved) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ success: true });
        });
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
