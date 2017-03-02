import { Router } from 'express';
import * as MessageController from '../controllers/messaging.controller';
const router = new Router();

// Posts a new message to a team in a contest
router.route('/contest/:contest_id/team/:team_id/messages').post(MessageController.sendTeamMessageApi);

// Gets all messages for a team in a contest
router.route('/contest/:contest_id/team/:team_id/messages').get(MessageController.getTeamMessages);

// Posts a new message to the judges in a contest
router.route('/contest/:contest_id/team/:team_id/messages/judge').post(MessageController.sendJudgeMessage);

// Gets an array of objects for the judges to see which teams have messaged
router.route('/contest/:contest_id/team/:team_id/messages/judge').get(MessageController.getJudgeMessages);

// Posts a message for all teams in a contest
router.route('/contest/:contest_id/messages').post(MessageController.broadcastMessage);

export default router;
