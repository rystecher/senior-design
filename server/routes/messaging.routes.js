import { Router } from 'express';
import * as MessageController from '../controllers/messaging.controller';
const router = new Router();

// Posts a new message to a team in a contest
router.route('/messages/:contestId/team/:teamId').post(MessageController.sendTeamMessageApi);

// Gets all messages for a team in a contest
router.route('/messages/:contestId/team/:teamId').get(MessageController.getTeamMessages);

// Posts a new message to the judges in a contest
router.route('/messages/:contestId/team/:teamId/tojudge').post(MessageController.sendJudgeMessage);

// Gets all messages for a team in a contest
router.route('/messages/:contestId/team/:teamId/forjudge').get(MessageController.getTeamMessagesForJudge);

// Gets an array of objects for the judges to see which teams have messaged
router.route('/messages/:contestId/judge').get(MessageController.getJudgeMessages);

// Gets an array of objects for the judges to see which teams have messaged
router.route('/messages/:contestId/new').get(MessageController.hasNewMessage);

// Posts a message for all teams in a contest
router.route('/messages/:contestId/broadcast').post(MessageController.sendBroadcastMessage);

// Get all broadcast messages in a contest
router.route('/messages/:contestId/broadcast').get(MessageController.getBroadcastMessages);

export default router;
