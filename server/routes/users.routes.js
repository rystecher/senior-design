import { Router } from 'express';
import * as UsersController from '../controllers/users.controller';

const router = new Router();

router.post('/', (req, res) => {
  //console.log(req.body);
  const { errors, isValid } = UsersController.validateInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }
});

export default router;
