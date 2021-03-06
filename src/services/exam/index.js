'use strict';

const service = require('feathers-mongoose');
const exam = require('./exam-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: exam,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/exams', service(options));

  // Get our initialize service to that we can bind hooks
  const examService = app.service('/exams');

  // Set up our before hooks
  examService.before(hooks.before);

  // Set up our after hooks
  examService.after(hooks.after);
};
