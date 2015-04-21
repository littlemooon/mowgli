'use strict';

module.exports = {
  entry: [
    './index.js'
  ],

  output: {
    path: __dirname,
    filename: 'jungle.js'
  },

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
    ],

    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ }
    ],

    noParse: [
      /node_modules\/cortex/
    ]
  }
};
