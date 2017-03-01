import Submission from '../models/Submission';
import {sendTeamMessage} from '../controllers/messaging.controller';

/**
 * Get all submissions for a contest
 * @param req
 * @param res
 * @returns void
 */
export function getSubmissions(req, res) {
    if (!req.params.contest_id) {
        res.status(403).end();
    } else {
        Submission.find({ contestID: req.params.contest_id }).exec((err, submissions) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json({ submissions });
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

/**
 * Update feedback for a submission
 * @param req
 * @param res
 * @returns void
 */
export function sendFeedback(req, res) {
    if (!req.params.submission_id || !req.body.feedback) {
        res.status(403).end();
    } else {
        Submission.findOne({ cuid: req.params.submission_id }).exec((err, submission) => {
            if (err) {
                res.status(500).send(err);
            } else {
                submission.feedback = req.body.feedback;
                sendTeamMessage(genSubmissionResponse(submission), submission.teamID);
                submission.save((err, saved) => {
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
    Submission.findOne({ cuid: req.params.submission_id }).exec((err, submission) => {
        if (err) {
            res.status(500).send(err);
        } else {
            Contest.findOne({ cuid: submission.contestID }).exec((err, contest) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    const team = contest.teams.id(submission.teamID);
                    const problem = team.problem_attempts[number].attempts.pop();
                    contest.save();
                    submission.remove(() => {
                        res.status(200).end();
                    });
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
    }
}

export function computeScore(contestStart, numAttempts) {
    const millisInMinutes = 1000 * 60;
    return ((Date.now() - contestStart) / millisInMinutes) + 20 * numAttempts;
}

export function createFeedbackMessage(correct, compilemessage) {
    let message = "Awaiting feedback from judges...";
    if (correct) {
        message = "Your solution was correct!";
    } else if (compilemessage != null) {
        message = compilemessage;
    }
    return { from: 'Automated', message };
}
