import { Router } from 'express';
import * as MessageController from '../controllers/messaging.controller';
const router = new Router();

// Posts a new message to a team in a contest
router.route('/messages/:contest_id/team/:team_id').post(MessageController.sendTeamMessageApi);

// Gets all messages for a team in a contest
router.route('/messages/:contest_id/team/:team_id').get(MessageController.getTeamMessages);

// Posts a new message to the judges in a contest
router.route('/messages/:contest_id/team/:team_id/judge').post(MessageController.sendJudgeMessage);

// Gets an array of objects for the judges to see which teams have messaged
router.route('/messages/:contest_id/team/:team_id/judge').get(MessageController.getJudgeMessages);

// Posts a message for all teams in a contest
router.route('/messages/:contest_id').post(MessageController.broadcastMessage);

export default router;
