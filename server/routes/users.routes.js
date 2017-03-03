import { Router } from 'express';
import * as UsersController from '../controllers/users.controller';
import User from '../models/user';
import isEmpty from 'lodash/isEmpty';

const router = new Router();

function validateInput(data, otherValidations) {
  let { errors } = otherValidations(data);

  return User.find({username: data.username})
  .then(user => {
    if (user.length > 0) {
        errors.username = 'Username already taken';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  })
}

router.get('/:identifier', (req, res) => {
  User.find({ username: req.params.identifier }, {_id: 0,username: 1})
  .then(user => {
    res.json({ user });
  });
});

router.post('/', (req, res) => {
  //console.log(req.body);
  validateInput(req.body, UsersController.validateInput).then(({ errors, isValid }) => {

    if (isValid) {
      //res.json({ success: true});
      // var testUser = new User({username: 'jmar777', password: 'Password123'});
      const newUser = new User({username: req.body.username, password: req.body.password});
      newUser.save()
      .then(user => res.json({ success: true }))
      .catch(err => res.status(500).json({ error: err }));
    } else {
      res.status(400).json(errors);
    }
  });
});

export default router;