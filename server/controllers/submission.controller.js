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
        Submission.find({ contestID: req.params.contestId, teamID: req.params.teamId }).exec((err, submissions) => {
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
                readTextFile(`output/${submission.expectedOutputFileName}`).then((expectedOutput) => {
                    readTextFile(`submission/${submission.actualOutputFileName}`).then((actualOutput) => {
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

function markSubmissionCorrect(contestId, teamId, problemNum, message) {
    Contest.findOne({ cuid: contestId }, (err, contest) => {
        if (!err && contest) {
            const team = contest.teams.id(teamId);
            const problem = team.problem_attempts[problemNum]; // problem object of team
            problem.solved = true;
            team.score += computeScore(contest.start, problem.attempts.length);
            team.numSolved += 1;
            team.messages.push(message);
            contest.save();
        }
    });
}

function markSubmissionIncorrect(contestId, teamId, problemNum, message) {
    Contest.findOne({ cuid: contestId }, (err, contest) => {
        if (!err && contest) {
            const team = contest.teams.id(teamId);
            const problem = team.problem_attempts[problemNum]; // problem object of team
            problem.solved = false;
            team.score -= computeScore(contest.start, problem.attempts.length); // this won't be exact
            team.score = Math.max(team.score, 0); // make sure they don't have negative time score
            team.numSolved -= 1;
            team.messages.push(message);
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
                const { contestID, teamID, problemNumber } = submission;
                if (req.body.correct && !submission.correct) {
                    submission.correct = true;
                    markSubmissionCorrect(contestID, teamID, problemNumber, genSubmissionResponse(submission));
                } else if (!req.body.correct && submission.correct) {
                    submission.correct = false;
                    markSubmissionIncorrect(contestID, teamID, problemNumber, genSubmissionResponse(submission));
                } else {
                    sendTeamMessage(genSubmissionResponse(submission), submission.contestID, submission.teamID);
                }
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
        message: `Judge: Your submission for problem #${submission.problemNumber + 1},
        ${submission.problemName}, has been marked: ${submission.feedback}`,
    };
}

export function createFeedbackMessage(correct, problemNum, hadStdError, stderr, compilemessage, message) {
    let feedback = 'Awaiting feedback from judges...';
    try {
        if (correct) {
            feedback = 'Your solution was correct!';
        } else if (compilemessage !== '') {
            feedback = compilemessage;
        } else if (hadStdError) {
            feedback = `${message}: ${stderr}`;
        } else if ('Terminated due to timeout' === message) {
            feedback = `${message} after 10 seconds`;
        }
    } catch (err) {
        feedback = 'There was an error processing your request';
    }
    return {
        judgeFeedback: feedback,
        userFeedback: {
            from: 'Automated',
            message: `Problem ${problemNum}: ${feedback}`,
        },
    };
}

export function createTestFeedbackMessage(stderr, stdout, compilemessage, message, time, hadStdError) {
    let feedback = 'Awaiting feedback from our server...';
    try {
        if (compilemessage !== '') {
            feedback = compilemessage;
        } else if (hadStdError) {
            feedback = `${message}: ${stderr}`;
        } else if ('Terminated due to timeout' === message && 10 === time) {
            feedback = message;
        } else {
            feedback = `Test result: ${stdout} (${time} sec)`;
        }
    } catch (err) {
        feedback = 'There was an error processing your request';
    }
    return { from: 'Automated', message: feedback };
}
