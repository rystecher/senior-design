import { Router } from 'express';
import validateRegisterInput from '../controllers/validateRegisterInput';
import * as UserController from '../controllers/users.controller';
import User from '../models/user';
import isEmpty from 'lodash/isEmpty';

const router = new Router();

function validateInput(data, otherValidations) {
    let { errors } = otherValidations(data);

    return User.find({ username: data.username })
  .then(user => {
      if (0 < user.length) {
          errors.username = 'Username already taken';
      }
      return {
          errors,
          isValid: isEmpty(errors),
      };
  });
}

router.get('/:username', (req, res) => {
    User.find({ username: req.params.username }, { _id: 0, username: 1 })
  .then(user => {
      res.json({ user });
  });
});

router.post('/', (req, res) => {
  // console.log(req.body);
    validateInput(req.body, validateRegisterInput).then(({ errors, isValid }) => {
        if (isValid) {
      // res.json({ success: true});
      // var testUser = new User({username: 'jmar777', password: 'Password123'});
            const newUser = new User({ username: req.body.username, password: req.body.password });
            newUser.save()
      .then(user => res.json({ success: true }))
      .catch(err => res.status(500).json({ error: err }));
        } else {
            res.status(400).json(errors);
        }
    });
});

router.route('/:username/created').get(UserController.getCreatedContests);

router.route('/:username/firsttime').get(UserController.isFirstTimeUser);

router.route('/:username/joined').get(UserController.getJoinedContests);

router.route('/:username/joinable').get(UserController.getJoinableContests);

// Get the role of a user in a contest
router.route('/:username/contest/:contestId/role').get(UserController.getUserRole);

export default router;
