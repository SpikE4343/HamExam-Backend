'use strict';
const examsession = require('./examsession');
const exam = require('./exam');
const questionpool = require('./questionpool');
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');
module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(user);
  app.configure(questionpool);
  app.configure(exam);
  app.configure(examsession);
};
