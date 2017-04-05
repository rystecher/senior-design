import { Router } from 'express';
import * as SubmissionController from '../controllers/submission.controller';
const router = new Router();

// Gets all submissions for a contest
router.route('/submissions/:contestId/all').get(SubmissionController.getSubmissions);

// Gets a single submission
router.route('/submissions/:submissionId').get(SubmissionController.getSubmission);

// Posts feedback for a submission
router.route('/submissions/feedback/:submissionId').post(SubmissionController.sendFeedback);

// Posts feedback for a submission
router.route('/submissions/:submissionId').delete(SubmissionController.deleteSubmission);

// Get all submissions for a team in a contest
router.route('/submissions/:contestId/:teamId/all').get(SubmissionController.getSubmissionsForTeam);

// Get a single submission's code for a team in a contest
router.route('/submissions/:contestId/:teamId/:submissionId').get(SubmissionController.getCodeForSubmission);

export default router;
