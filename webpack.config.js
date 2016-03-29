var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')


module.exports = {
  context: __dirname,
      
  entry: [
      'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      './js/index', // Your appʼs entry point
  ],

  output: {
    path: path.resolve('../django/univjobs/assets/bundles/'),
      // filename: '[name]-[hash].js',
      filename: '[name]-[hash].js',
      publicPath: 'http://localhost:3000/assets/bundles/' // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(), // don't reload if there is an error
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    loaders: [
      // we pass the output from babel loader to react-hot loader
      { test: /\.js?$/,
        loaders: ['react-hot', 'jsx', 'babel?presets[]=react'],
        exclude: /node_modules/
      },
    ],
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  }
}
