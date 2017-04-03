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

// Get contest info for contest home page
router.route('/contests/:contest_id/info').get(ContestController.getContestInfo);

// Sets the start time for a contest
router.route('/contests/:contest_id/open').post(ContestController.openContest);

// Closes a contest, no submissions will be accepted after a ocntest is closed
router.route('/contests/:contest_id/close').post(ContestController.closeContest);

// Creates a new Contest
router.route('/contests').post(ContestController.createContest);

// Creates a new team in a contest
router.route('/contests/:contest_id/join').post(ContestController.joinContest);

//* *******************SCOREBOARD******************************

// Get scores for a contest by cuid
router.route('/contests/:contest_id/scoreboard').get(ContestController.getTeamScores);

// Hides scoreboard for contest
router.route('/contests/:contest_id/scoreboard/hide').post(ContestController.hideScoreboard);

// Shows scoreboard for contest
router.route('/contests/:contest_id/scoreboard/show').post(ContestController.showScoreboard);

//* ************************************************************

// Adds a new member to a team
router.route('/contests/:contest_id/teams/:team_id').post(ContestController.addAccountToTeam);

// Gets the solved arrays for the problem page
router.route('/contests/:contest_id/teams/:team_id/solved').get(ContestController.getSolvedArrays);

// Gets the pdf for the specified problem
router.route('/contests/:contest_id/problem/:problem_no').get(ContestController.getProblemFile);

// Deletes the specified problem
router.route('/contests/:contestId/problem/:problemNum').delete(ContestController.deleteProblem);

// Changes the pdf file for the specified contest for the specified problem
router.route('/contests/:contest_id/problem/:problem_no/edit').post(ContestController.changeProblemPdf);

// Uploads a pdf for the specified contest
router.route('/contests/:contest_id/problem/create').post(ContestController.createProblem);

// Sets the problem meta data
router.route('/contests/:contest_id/problem/:problem_no/metadata').post(ContestController.setProblemMetaData);

// Gets the problem meta data from a file
router.route('/contests/:contest_id/problem/:problem_no/metadata').get(ContestController.getProblemMetaData);

// Gets the number of problems in a contest
router.route('/contests/:contest_id/number_of_problems').get(ContestController.getNumberOfProblems);

// Test the code submitted
router.route('/contests/:contest_id/teams/:team_id/submit/testCode').post(ContestController.testProblemAttempt);

// Run the code submitted
router.route('/contests/:contest_id/teams/:team_id/submit').post(ContestController.addProblemAttempt);

// Delete a contest by cuid
router.route('/contests/:cuid').delete(ContestController.deleteContest);

export default router;
