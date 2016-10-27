var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
//var nodemon = require('nodemon');

gulp.task('start', function () {
  nodemon({
    script: 'src/index.js'
  , ext: 'js'
  //, env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('default', ['start']);
