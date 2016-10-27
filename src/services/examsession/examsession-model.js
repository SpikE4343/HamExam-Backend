'use strict';

// examsession-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examsessionSchema = new Schema({
  date: { type: Date, 'default': Date.now, required: true, unique:true },
  active: { type: Boolean, 'default': false },

  candidates: [{
    userid: { type: Schema.Types.ObjectId, ref: 'user', required: true},
    poolid: { type: Schema.Types.ObjectId, ref: 'questionpool', required: true},
    exams: [{
        id: { type: Schema.Types.ObjectId, ref: 'exam' }
    }]
  }],

  examiners: [{
    userid: { type: Schema.Types.ObjectId, ref: 'user', required: true},
    examsgraded: [{
        id: { type: Schema.Types.ObjectId, ref: 'exam' }
    }]
  }],

  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const examsessionModel = mongoose.model('examsession', examsessionSchema);

module.exports = examsessionModel;
