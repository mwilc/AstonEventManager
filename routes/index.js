var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//Root route
router.get('/', function(req, res){
  res.render('index');
});

//Auth routes

//Get register form
router.get('/register', function(req, res){
  res.render('register');
});

//Handle signup logic
router.post('/register', function(req, res){
  console.log(req.body)
  var newUser = new User({username: req.body.username, email: req.body.email, type: req.body.type});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/events');
    });
  });
});

//Get login form
router.get('/login', function(req, res){
  res.render('login');
});

//Handle login logic
router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/events',
    failureRedirect: '/login'
  }), function(req, res){
});

//Logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/events');
});


//Middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect("/login");
  }
}

module.exports = router;
