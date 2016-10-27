'use strict';

const service = require('feathers-mongoose');
const examsession = require('./examsession-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: examsession,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/examsessions', service(options));

  // Get our initialize service to that we can bind hooks
  const examsessionService = app.service('/examsessions');

  // Set up our before hooks
  examsessionService.before(hooks.before);

  // Set up our after hooks
  examsessionService.after(hooks.after);
};
