const passport = require("passport");
const UserModel = require("../Models/user.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id).then((user) => {
    done(null, user.id);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      //Check if user already exists in DB
      UserModel.findOne({ googleid: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log(`User is: `, currentUser.username);
          done(null, currentUser);
        } else {
          new UserModel({
            username: profile.displayName,
            googleid: profile.id,
            role: 'user'
          })
            .save()
            .then((newUser) => {
              console.log(`New user created: ${newUser}`);
              done(null, newUser);
            });
        }
      });
    }
  )
);
