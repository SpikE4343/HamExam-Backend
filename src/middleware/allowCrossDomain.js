'use strict';

module.exports = function(app) {
  return function(req, res, next) {
    // Perform actions
    res.header('Access-Control-Allow-Origin', app.get('cors.whitelist'));
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
  };
};
