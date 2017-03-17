import { Router } from 'express';
import * as HRController from '../controllers/hackerRank.controller';
const router = new Router();

// Submit and run source code to HackerRank
router.route('/hackerrank').post(HRController.hackerrankCall);

export default router;
