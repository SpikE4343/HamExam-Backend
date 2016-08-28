'use strict';

const service = require('feathers-mongoose');
const questionpool = require('./questionpool-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: questionpool,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/questionpools', service(options));

  // Get our initialize service to that we can bind hooks
  const questionpoolService = app.service('/questionpools');

  // Set up our before hooks
  questionpoolService.before(hooks.before);

  // Set up our after hooks
  questionpoolService.after(hooks.after);
};
