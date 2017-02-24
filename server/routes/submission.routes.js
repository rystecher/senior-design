import { Router } from 'express';
import * as SubmissionController from '../controllers/submission.controller';
const router = new Router();

// Gets all submissions for a contest
router.route('/submissions/:contest_id').get(SubmissionController.getSubmissions);

// Posts feedback for a submission
router.route('/submissions/feedback/:submission_id').post(SubmissionController.sendFeedback);

// Posts feedback for a submission
router.route('/submissions/:submission_id').delete(SubmissionController.deleteSubmission);

// Gets feedback for a submission
router.route('/submissions/feedback/:submission_id').get(SubmissionController.getFeedback);

export default router;
