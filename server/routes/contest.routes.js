import { Router } from 'express';
import * as ContestController from '../controllers/contest.controller';
const router = new Router();

// Get all Contests
router.route('/contests/all').get(ContestController.getContests);

// Get one contest by cuid
router.route('/contests/:contestId').get(ContestController.getContest);

// Get contest info for contest home page
router.route('/contests/:contestId/info').get(ContestController.getContestInfo);

// Updates contest info for contest home page
router.route('/contests/:contestId/info').post(ContestController.updateContestInfo);

// Sets the start time for a contest
router.route('/contests/:contestId/open').post(ContestController.openContest);

// Closes a contest, no submissions will be accepted after a ocntest is closed
router.route('/contests/:contestId/close').post(ContestController.closeContest);

// Creates a new Contest
router.route('/contests').post(ContestController.createContest);

// Creates a new team in a contest
router.route('/contests/:contestId/join').post(ContestController.joinContest);

//* *******************SCOREBOARD******************************

// Get scores for a contest by cuid
router.route('/contests/:contestId/scoreboard').get(ContestController.getTeamScores);

// Hides scoreboard for contest
router.route('/contests/:contestId/scoreboard/hide').post(ContestController.hideScoreboard);

// Shows scoreboard for contest
router.route('/contests/:contestId/scoreboard/show').post(ContestController.showScoreboard);

//
router.route('/contests/:contestId/scoreboard/solvedBy').get(ContestController.getSolvedBy);

//* ************************************************************

// Adds a new member to a team
router.route('/contests/:contestId/teams/:teamId').post(ContestController.addAccountToTeam);

// Gets the solved arrays for the problem page
router.route('/contests/:contestId/teams/:teamId/solved').get(ContestController.getSolvedArrays);

// Gets the pdf for the specified problem
router.route('/contests/:contestId/problem/:problem_no').get(ContestController.getProblemFile);

// Deletes the specified problem
router.route('/contests/:contestId/problem/:problemNum').delete(ContestController.deleteProblem);

// Changes the pdf file for the specified contest for the specified problem
router.route('/contests/:contestId/problem/:problem_no/edit').post(ContestController.changeProblemPdf);

// Uploads a pdf for the specified contest
router.route('/contests/:contestId/problem/create').post(ContestController.createProblem);

// Sets the problem meta data
router.route('/contests/:contestId/problem/:problem_no/metadata').post(ContestController.setProblemMetaData);

// Gets the problem meta data from a file
router.route('/contests/:contestId/problem/:problem_no/metadata').get(ContestController.getProblemMetaData);

// Gets the number of problems in a contest
router.route('/contests/:contestId/number_of_problems').get(ContestController.getNumberOfProblems);

// Test the code submitted
router.route('/contests/:contestId/teams/:teamId/submit/testCode').post(ContestController.testProblemAttempt);

// Run the code submitted
router.route('/contests/:contestId/teams/:teamId/submit').post(ContestController.addProblemAttempt);

// Delete a contest by cuid
router.route('/contests/:cuid').delete(ContestController.deleteContest);

export default router;
