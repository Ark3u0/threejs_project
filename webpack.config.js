var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src/es6');

module.exports = {
  entry: APP_DIR + '/app.es6',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test : /\.es6?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  },
  devtool: "inline-source-map"
};