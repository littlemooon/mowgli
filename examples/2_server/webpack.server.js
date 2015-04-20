'use strict';

var webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server');

var port = 9000;

var config = {
  devServer: true,
  devtool: 'sourcemaps',
  debug: true,

  entry: [
    'webpack-dev-server/client?http://localhost:' + port,
    'webpack/hot/only-dev-server',
    './main.js'
  ],

  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
    publicPath: 'http://localhost:' + port + '/dist/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
    ],

    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ }
    ],

    noParse: [
      /node_modules\/cortex/
    ]
  }
};

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  stats: {
    assets: false,
    colors: false,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  }
}).listen(port, 'localhost', function (err) {
  if (err) console.log(err);
});
