var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Event = require('./models/event');
var seedDB = require('./seeds');
var Comment = require('./models/comment');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');

//Requiring the route files
var commentRoutes = require('./routes/comments');
var eventRoutes = require('./routes/events');
var indexRoutes = require('./routes/index');

// seedDB(); // Seed the db
// mongoose.connect('mongodb://localhost/eventdb');
mongoose.connect('mongodb+srv://ox:Remember1@cluster0.8d857.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


//Passport config
app.use(require('express-session')({
  secret: 'Passcode!!!',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware for passing currentUser to all templates
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

//Use the requrired route files
app.use(indexRoutes);
app.use(commentRoutes);
app.use(eventRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(){
  console.log("Server Started...");
});
