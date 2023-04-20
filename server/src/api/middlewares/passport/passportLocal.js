const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/users');

/**
 * @description Local strategy. Common to everyone using it.
 */
const strategy = new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    User.findOne({ email })
    .then((user) => {
      if (!user) { 
        return done(null, false, { message: 'Incorrect email.' }); 
      }
      if (!user.validPassword(password)) { 
        return done(null, false, { message: 'Incorrect password.' }); 
      }
      return done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
});

module.exports = strategy;
