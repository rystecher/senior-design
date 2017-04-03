import express from 'express';
import User from '../models/user';

let router = express.Router();

router.post('/', (req, res, next) => {
    const { identifier, password } = req.body;
    User.getAuthenticated(identifier, password, function (err, token, user) {
        if (err) {
            console.log(err);
            res.status(401).send('Invalid Username or Password');
        }
        else if (token) {
      // We are sending the profile inside the token
            res.json({ token, user });
        } else {
            res.status(401).json({ errors: { form: 'Invalid Credentials' } });
        }
    });
});

export default router;
