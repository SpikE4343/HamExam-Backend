'use strict';

const randomExam = require('./randomExam');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

function authUser(){
  return [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ];
}


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [ randomExam() ],
  update: [authUser()],
  patch: [authUser()],
  remove: [authUser()]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
