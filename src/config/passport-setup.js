const { eventNames } = require('../Schemas/user.schema');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    // TODO: return user.id instead. Once two implementations below are complete.
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    // TODO: change parameter user to id & find user object in DB.
    // User.findById(id, function(err, user) {
        done(null, user);
    // });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // Use profile id to check if user exists in db or not.
    // TODO: Check if user exists or create user in DB.
    return done(null, profile);
  }
));