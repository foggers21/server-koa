const { Strategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const User = require('../../models/user.model');
const { auth } = require('../config');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: auth.secret,
};

module.exports =  new Strategy(opts, async (jwtPayload, done) => {
  const user = await User.findById(jwtPayload.id);
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});
