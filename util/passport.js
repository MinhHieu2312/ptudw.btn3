const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


//module.exports = passport;
//1. Define the strategy
module.exports = function(passport) {
  //2. (I will move all of this to passport.js later on)
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  //HANGING
  passport.deserializeUser(function(id, done) {
    userModel.getUserById(id).then((user) => {
        done(null, user);
    });
          
  });

  passport.use(new LocalStrategy(
    async function (username, password, done) {
      console.log("Entering LocalStrategy");
      const user = await userModel.checkCredential(username, password);
      if (!user) {
        console.log("Login failed");
        return done(null, false, { message: 'Incorrect username or password. ' });
      }
      console.log("Login success");
      return done(null, user);
    }
  ));
}







