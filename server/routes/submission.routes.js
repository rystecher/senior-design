import { Router } from 'express';
import * as SubmissionController from '../controllers/submission.controller';
const router = new Router();

// Gets all submissions for a contest
router.route('/submissions/:contestId/add').get(SubmissionController.getSubmissions);

// Gets a single submission
router.route('/submissions/:submissionId').get(SubmissionController.getSubmission);

// Posts feedback for a submission
router.route('/submissions/feedback/:submissionId').post(SubmissionController.sendFeedback);

// Posts feedback for a submission
router.route('/submissions/:submissionId').delete(SubmissionController.deleteSubmission);

export default router;
