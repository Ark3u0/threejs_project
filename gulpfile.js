var gulp = require('gulp');
var webpack = require("webpack-stream");


gulp.task('bundle', function(done) {
  gulp.src('./src/js/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./build'));
});