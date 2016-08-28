'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('pool service', function() {
  it('registered the pools service', () => {
    assert.ok(app.service('pools'));
  });
});
