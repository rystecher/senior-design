import User from '../models/user';

export function addContestToCreatedContestsID(username, cuid) {
  User.findOne({ username: username }, function(err, user) {
    if (err) return cb(err);
    user.createdContestsID.push(cuid);
    user.save();
  });
};
