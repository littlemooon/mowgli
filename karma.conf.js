
module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai'],

    files: [
      'test/*_test.js'
    ],

    preprocessors: {
      'test/*_test.js': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      watch: true,
      resolve: {
        extensions: ['', '.js']
      },
      module: {
        loaders: [
          { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ }
        ]
      }
    },

    webpackMiddleware: {
      stats: {
        colors: true
      },
      quiet: true
    },

    reporters: ['progress'],

    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,

    logLevel: config.LOG_INFO,

    browsers: ['Chrome']
  });
};
