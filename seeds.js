var mongoose = require('mongoose');
var Event = require('./models/event');
var Comment = require('./models/comment');

var data = [
  {
    title: 'Special Event',
    date:  '02/03/2024',
    organiser: 'Code master 3000',
    category: 'Special',
    description: 'A special event for special people',
    ticket_price: 4
  }
]

function seedDB(){
  //Remove all events
  Event.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log('Removed events!!!');
    // //Add events
    data.forEach(function(seed){
    Event.create(seed, function(err, event){
      if(err){
           console.log(err);
         }
         else{
           console.log('Added an event!');
         }
         Comment.create(
           {
             text: 'Hi!',
             author: 'User1'
           },
           function(err, comment){
           if(err){
             console.log(err);
           }
           else{
             event.comments.push(comment);
             event.save();
             console.log('Added comments!');
           }
         });
       });
     });
  });
}

module.exports = seedDB;
