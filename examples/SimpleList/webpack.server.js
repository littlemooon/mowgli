'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var port = 9000;

var config = {
  devServer: true,
  devtool: 'sourcemap',
  debug: true,

  entry: [
    'webpack-dev-server/client?http://localhost:9000',
    'webpack/hot/only-dev-server',
    './src/index.coffee'
  ],

  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
    publicPath: 'http://localhost:9000/dist/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.coffee']
  },

  module: {
    loaders: [
      { test: /\.coffee$/, loaders: ['react-hot', 'coffee'], exclude: /node_modules/ }
    ]
  }
};

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
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
}).listen(port, 'localhost', function(err) {
  if (err) {
    return console.error(err);
  }
});
