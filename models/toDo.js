var mongoose = require('mongoose');

var toDoSchema = mongoose.Schema({
  googleId: String,
  destinationName: {type: String, required: true},
  toDoWhat: String,
  toDoWhere: String,
  toDoCost: String,
  toDoTime: String,
  toDoNote: String,
});

module.exports = mongoose.model('toDo', tripSchema);
