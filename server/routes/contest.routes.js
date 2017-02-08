import { Router } from 'express';
import * as ContestController from '../controllers/contest.controller';
const router = new Router();

// Get all Contests
router.route('/contests').get(ContestController.getContests);

// Get all Contests
router.route('/contests/my').get(ContestController.getContestsFromIds);

// Get all Contests
router.route('/contests/join').get(ContestController.getContestsNotInIds);

// Get one contest by cuid
router.route('/contests/:cuid').get(ContestController.getContest);

// Get scores for a contest by cuid
router.route('/contests/:cuid/scoreboard').get(ContestController.getTeamScores);

// Add a new Contest
router.route('/contests').post(ContestController.addContest);

// Add a new Contest
router.route('/contests/:contest_id').post(ContestController.addTeamToContest);

// Add a new Contest
router.route('/contests/:contest_id/:team_id').post(ContestController.addAccountToTeam);

// Delete a contest by cuid
router.route('/contests/:cuid').delete(ContestController.deleteContest);

export default router;
