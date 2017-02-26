var mongoose = require('mongoose');

var toDoSchema = mongoose.Schema({
  googleId: String,
  destinationName: String,
  toDoWhat: {type: String, required: true},
  toDoWhere: String,
  toDoCost: String,
  toDoTime: String,
  toDoNote: String,
});

module.exports = mongoose.model('toDo', toDoSchema);
