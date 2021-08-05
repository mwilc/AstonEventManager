var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  organiser: String,
  category: String,
  description: String,
  ticket_price: Number,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

module.exports = mongoose.model('Event', eventSchema);
ticket_price
