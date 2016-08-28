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

  return function(hook){
    var parser = new QuestionPoolParser(hook.params.name);
    var text = new Buffer(decodeURIComponent( hook.data.pool), 'base64').toString('ascii');

    var rs = new Readable;
    rs.push(text);
    rs.push(null);

    let p = new Promise( function( resolve, reject) {
      rs.pipe(es.split())
        .pipe(es.mapSync(function(line ) {
          try {
            parser.parseLine(line);
          } catch( error ) {
            console.error(error);
            reject(error);
          }
        })
        .on('end', function() {
          hook.data =  Object.assign( {}, hook.data, parser.test );
          fs.writeFile( 'pool.json', JSON.stringify(hook.data, null, 2));
          resolve(hook);
        }));
    }).catch(function(error) {
      console.error(error.stack);
    });

    return p;
  };
};
