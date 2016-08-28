var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream');

var QuestionPoolParser = require('./QuestionPoolParser');

var parser = new QuestionPoolParser('2014-2018 Tech Pool.txt');

var rs = fs.createReadStream('2014-2018 Tech Pool.txt')
  rs.pipe(es.split())
    .pipe(es.mapSync(function(line){

      // pause the readstream
      //rs.pause();

      parser.parseLine(line);

      // resume the readstream, possibly from a callback
      //rs.resume();
    })
    //.on('error', function(err){
    //    console.log('Error:'+err+', while reading file.');
    //})
    .on('end', function(){
        console.log('Read entire file.');
        fs.writeFile('pool.json', JSON.stringify(parser.test, null, 2));
        console.log();
    }));
