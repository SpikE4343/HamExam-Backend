'use strict';

var fs = require('fs');
var http = require('http');
var es = require('event-stream');
var Readable = require('stream').Readable;
var QuestionPoolParser = require('./QuestionPoolParser');

// src/services/pool/hooks/parseQuestionPool.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options)
{
  options = Object.assign({}, defaults, options);

  return function(hook)
  {
    var parser = new QuestionPoolParser(hook.params.id);
    var text = new Buffer(decodeURIComponent( hook.data.pool), 'base64').toString('ascii');

    var rs = new Readable;
    rs.push(text);
    rs.push(null);

    let p = new Promise( function( resolve, reject) {
      rs.pipe(es.split())
        .pipe(es.mapSync(line => {
          parser.parseLine(line);
        })
        .on('end', function() {
          hook.data.pool = parser.test.subElements;
          resolve(hook);
        }));
    });

    return p;
  };
};
