var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var CLIENT_DIR = path.resolve(__dirname, 'client/es6');

module.exports = {
  entry: CLIENT_DIR + '/app.es6',
  output: {
    path: BUILD_DIR,
    filename: 'client.bundle.js'
  },
  module: {
    loaders: [
      { test : /\.es6?/,
        include : CLIENT_DIR,
        loader : 'babel'
      }
    ]
  },
  devtool: "inline-source-map"
};