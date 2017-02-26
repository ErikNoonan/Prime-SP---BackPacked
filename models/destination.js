var mongoose = require('mongoose');
var toDoSchema = require('./toDo').schema;

var destinationSchema = mongoose.Schema({
  googleId: {type: String, required: true},
  destinationName: {type: String, required: true},
  lodgingName: String,
  lodgingAddress: String,
  lodgingFrom: Date,
  lodgingTo: Date,
  lodgingResNum: String,
  lodgingNote: String,
  arrivalHow: String,
  arrivalWhere: String,
  arrivalTime: Date,
  arrivalResNum: String,
  departureHow: String,
  departureWhere: String,
  departureTime: Date,
  departureResNum: String,
  toDos: [toDoSchema]
});

module.exports = mongoose.model('destination', destinationSchema);
