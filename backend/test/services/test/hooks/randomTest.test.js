'use strict';

const assert = require('assert');
const randomTest = require('../../../../src/services/test/hooks/randomTest.js');

describe('test randomTest hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    randomTest()(mockHook);

    assert.ok(mockHook.randomTest);
  });
});
