'use strict';

// exam-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
  pool: { type: Schema.Types.ObjectId, required: true },
  //name: String,
  //user: { type: Schema.Types.ObjectId, require: true},
  questions: [
    {
      id:  { type: String, required: true },
      question:  { type: String, required: true },
      answer: { type: Number, default: -1},
      choice: { type: Number, default: -1},
      choices: [String]
    }
  ],
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const examModel = mongoose.model('exam', examSchema);

module.exports = examModel;
