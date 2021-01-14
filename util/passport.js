const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

  const userModel = require('../models/Service/userModel');
  const userMongooseModel = require('../models/users');

//1. Define the strategy
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

//2. (I will move all of this to passport.js later on)
passport.serializeUser(function(user, done) {
    console.log('Serialize');
  done(null, user._id);
});

//HANGING
passport.deserializeUser(function(id, done) {
  userModel.getUserById(id).then((user) => {
    console.log('Deserialize');
    console.log(user);
      done(null, user);
  });
        
});

passport.Authenticate = async function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return next(err); }
    if (!user) { 
      return res.render('login', {message : 'Incorrect username or password'});
    }
    if (user.status == "INACTIVE")
      return res.render('login', {message : 'Account is not active. Please activate it'});
    
    req.logIn(user, function(err) {
      if (err) {
        return next(err); }

      console.log('Login Function');
      res.locals.user = user;
      res.locals.username = user.username;

      return res.render('index');
    });
  })(req, res, next);
}

passport.LogoutHandler = async function(req, res){
  req.logout();
  res.redirect('/');
}

module.exports = passport;






