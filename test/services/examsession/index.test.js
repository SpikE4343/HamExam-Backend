'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('examsession service', function() {
  it('registered the examsessions service', () => {
    assert.ok(app.service('examsessions'));
  });
});
