'use strict';

// questionpool-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionpoolSchema = new Schema({
  name: { type: String, required: true, unique: true },
  tag: { type: String, required: true },
  active: Boolean,
  url: String,
  subElements: [{
      id: { type: String, required: true },
      description: String,
      sections: [{
          id: { type: String, required: true },
          description: String,
          questions: [{
              id: { type: String, required: true },
              question: { type: String, required: true },
              answer: { type: Number, required: true },
              choices: { type: [String], required: true },
          }]
      }]
  }],
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const questionpoolModel = mongoose.model('questionpool', questionpoolSchema);

module.exports = questionpoolModel;
