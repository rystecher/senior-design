import { Router } from 'express';
import * as TeamController from '../controllers/team.controller';
const router = new Router();

// Posts a new message to a team in a contest
router.route('/contest/:contest_id/team/:team_id/messages').post(TeamController.sendTeamMessageApi);

// Gets all messages for a team in a contest
router.route('/contest/:contest_id/team/:team_id/messages').get(TeamController.getTeamMessages);

// Posts a message for all teams in a contest
router.route('/contest/:contest_id/messages').post(TeamController.broadcastMessage);

export default router;
