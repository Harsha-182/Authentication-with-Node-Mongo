const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('../../constants');
const User = require('../../../models/users');

let opts = {
  passReqToCallback: true,
};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

/**
 * @description JWT strategy common to all users. Validates the token.
 */
const strategy = new JwtStrategy(opts, (async (req,payload,done) => {
  try {

      const token = req.headers.authorization.split(' ')[1];

      const user = await User.findById({
      id: payload.id,
      });

      if (!user) {
      return done(new Error('User not logged in.'),null)
    }

    return done(null, user);
  } catch (error) { 
    return done(error);
  }
}));

module.exports = strategy;
