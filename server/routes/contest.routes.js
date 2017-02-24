import { Router } from 'express';
import * as ContestController from '../controllers/contest.controller';
const router = new Router();

// Get all Contests
router.route('/contests/all').get(ContestController.getContests);

// Get all Contests
router.route('/contests/my').get(ContestController.getContestsFromIds);

// Get all Contests
router.route('/contests/join').get(ContestController.getContestsNotInIds);

// Get one contest by cuid
router.route('/contests/:contest_id').get(ContestController.getContest);

// Creates a new Contest
router.route('/contests').post(ContestController.createContest);

// Creates a new team in a contest
router.route('/contests/:contest_id').post(ContestController.addTeamToContest);

//********************SCOREBOARD******************************

// Get scores for a contest by cuid
router.route('/contests/:cuid/scoreboard').get(ContestController.getTeamScores);

// Hides scoreboard for contest
router.route('/contests/:contest_id/scoreboard/hide').post(ContestController.hideScoreboard);

// Shows scoreboard for contest
router.route('/contests/:contest_id/scoreboard/show').post(ContestController.showScoreboard);

//*************************************************************

// Adds a new member to a team
router.route('/contests/:contest_id/teams/:team_id').post(ContestController.addAccountToTeam);

// Gets the solved arrays for the problem page
router.route('/contests/:contest_id/teams/:team_id/solved').get(ContestController.getSolvedArrays);

// Gets the pdf or txt file for the specified problem
router.route('/contests/:contest_id/problem/:problem_no').get(ContestController.getProblemFile);

// Run the code submitted
router.route('/contests/:contest_id/teams/:team_id/submit').post(ContestController.addProblemAttempt);

// Delete a contest by cuid
router.route('/contests/:cuid').delete(ContestController.deleteContest);

export default router;
