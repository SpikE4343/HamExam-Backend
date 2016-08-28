'use strict';

const assert = require('assert');
const parseQuestionPool = require('../../../../src/services/pool/hooks/parseQuestionPool.js');

describe('pool parseQuestionPool hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    parseQuestionPool()(mockHook);

    assert.ok(mockHook.parseQuestionPool);
  });
});
