var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var Comment = require('../models/comment');

//Add new comment form
router.get('/events/:id/comments/new', isLoggedIn, function(req, res){
  Event.findById(req.params.id, function(err, event){
    res.render('comments/new', {event: event});
  });
});

//Create comment route
router.post('/events/:id/comments', isLoggedIn, function(req, res){
  console.log(req.body);
  Event.findById(req.params.id, function(err, event){
    if(err){
      console.log(err);
        res.redirect('back');
    }
    else{
      console.log(req.body);
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        }
        else{
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          event.comments.push(comment);
          event.save();
          res.redirect('/events/' + event._id);
        }
      });
    }
  });
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
