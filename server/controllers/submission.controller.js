import Submission from '../models/submission';
import Contest from '../models/contest';
import { sendTeamMessage } from '../controllers/messaging.controller';
import { readTextFile } from '../controllers/contest.controller';

export function computeScore(contestStart, numAttempts) {
    const millisInMinutes = 1000 * 60;
    return Math.round(((Date.now() - contestStart) / millisInMinutes)) + 20 * numAttempts;
}

/**
 * Get all submissions for a contest
 * @param req
 * @param res
 * @returns void
 */
export function getSubmissions(req, res) {
    if (!req.params.contestId) {
        res.status(403).end();
    } else {
        Submission.find({ contestID: req.params.contestId }).exec((err, submissions) => {
            if (err) {
                res.status(500).send(err);
            } else if (!submissions) {
                res.json({ submissions: [] });
            } else {
                res.json({ submissions });
            }
        });
    }
}

/**
 * Get all submissions for a team
 * @param req
 * @param res
 * @returns void
 */
export function getSubmissionsForTeam(req, res) {
    if (!req.params.contestId || !req.params.teamId) {
        res.status(403).end();
    } else {
        Submission.find({ contestID: req.params.contestId , teamID: req.params.teamId}).exec((err, submissions) => {
            if (err) {
                res.status(500).send(err);
            } else if (!submissions) {
                res.json({ submissions: [] });
            } else {
                res.json({ submissions: submissions });
            }
        });
    }
}

/**
 * Get all submissions for a team
 * @param req
 * @param res
 * @returns void
 */
export function getCodeForSubmission(req, res) {
    if (!req.params.submissionId) {
        res.status(403).end();
    } else {
        Submission.findOne({ cuid: req.params.submissionId }).exec((err, submission) => {
            if (err) {
                res.status(500).send(err);
            } else if (!submission) {
                res.status(400).send({ err: 'Submission does not exist' });
            } else {
                res.json({ code: submission.code });
            }
        });
    }
}


/**
 * Get a single submission for a contest
 * @param req
 * @param res
 * @returns void
 */
export function getSubmission(req, res) {
    if (!req.params.submissionId) {
        res.status(403).end();
    } else {
        Submission.findOne({ cuid: req.params.submissionId }).exec((err, submission) => {
            if (err) {
                res.status(500).send(err);
            } else if (!submission) {
                res.status(400).send({ err: 'Submission does not exist' });
            } else {
                readTextFile(`output/${submission.fileName}`).then((expectedOutput) => {
                    readTextFile(`submission/${submission.fileName}`).then((actualOutput) => {
                        res.json({ submission, expectedOutput, actualOutput });
                    }).catch(err3 => res.status(500).send(err3));
                }).catch(err2 => res.status(500).send(err2));
            }
        });
    }
}

/**
 * Creates a submission
 * @returns void
 */
export function createSubmission(submission) {
    const newSubmission = new Submission(submission);
    newSubmission.save();
}

function markSubmissionCorrect(contestId, teamId, problemNum) {
    Contest.findOne({ cuid: contestId }, (err, contest) => {
        if (!err && contest) {
            const team = contest.teams.id(teamId);
            const problem = team.problem_attempts[problemNum]; // problem object of team
            team.score += computeScore(contest.start, problem.attempts.length);
            contest.save();
        }
    });
}

/**
 * Update feedback for a submission
 * @param req
 * @param res
 * @returns void
 */
export function sendFeedback(req, res) {
    if (!req.params.submissionId || !req.body.feedback) {
        res.status(403).end();
    } else {
        Submission.findOne({ cuid: req.params.submissionId }).exec((err, submission) => {
            if (err) {
                res.status(500).send(err);
            } else if (!submission) {
                res.status(400).send({ err: 'Submission does not exist' });
            } else {
                submission.feedback = req.body.feedback;
                if (req.body.correct && !submission.correct) {
                    submission.correct = true;
                    const { contestID, teamID, problemNumber } = submission;
                    markSubmissionCorrect(contestID, teamID, problemNumber);
                }
                sendTeamMessage(genSubmissionResponse(submission), submission.teamID);
                submission.save(err => {
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

/**
 * Delete a submission
 * @param req
 * @param res
 * @returns void
 */
export function deleteSubmission(req, res) {
  console.log("in delete submissions controller");
    Submission.findOne({ cuid: req.params.submissionId }).exec((err, submission) => {
        if (err) {
            res.status(500).send(err);
        } else if (!submission) {
            res.status(400).send({ err: 'Submission does not exist' });
        } else {
            Contest.findOne({ cuid: submission.contestID }).exec((err, contest) => {
                if (err) {
                    res.status(500).send(err);
                } else if (!contest) {
                    res.status(400).send({ err: 'Contest does not exist' });
                } else {
                    const team = contest.teams.id(submission.teamID);
                    if (!team) {
                        res.status(400).send({ err: 'Team does not exist' });
                    } else {
                        team.problem_attempts[submission.problemNumber].attempts.pop();
                        contest.save();
                        submission.remove(() => {
                            res.status(200).end();
                        });
                    }
                }
            });
        }
    });
}

function genSubmissionResponse(submission) {
    return {
        from: 'Judges',
        message: `Judge: Your submission for problem #${submission.problemNumber},
        ${submission.problemName}, has been marked: ${submission.feedback}`,
    };
}

export function createFeedbackMessage(correct, msg, compileMessage, problemNum, hadStdError, stderr) {
    let message = 'Awaiting feedback from judges...';
    if (correct) {
        message = 'Your solution was correct!';
    } else if (msg === 'Terminated due to timeout') {
        message = msg + ' after 10 seconds.';
    } else if (compileMessage !== '') {
        message = compileMessage;
    } else if (hadStdError) {
        message = 'Standard Error ' + stderr.toString();
    }
    return { from: 'Automated', message: `Problem ${problemNum}: ` + message };
}

export function createTestFeedbackMessage(message, compileMessage, stdout, time, hadStdError, stderr) {
    let feedBack = 'Awaiting feedback from our server...';
  // Ran out of time
    if (message === 'Terminated due to timeout' && time === 10) {
        feedBack = message + ' after 10 seconds.';
    } else if (compileMessage !== undefined) {
        feedBack = compileMessage;
    } else if (hadStdError) {
        feedBack = 'Standard Error: ' + stderr.toString();
    } else {
        feedBack = stdout;
    }
    return { from: 'Automated', message: 'Test result: ' + feedBack + `\nRan in ${time} seconds` };
}
