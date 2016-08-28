'use strict';
const pool = require('./pool');
const exam = require('./exam');
const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;
  app.configure(authentication);
  app.configure(user);
  app.configure(exam);
  app.configure(pool);
};
