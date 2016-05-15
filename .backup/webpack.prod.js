// vim:set et sw=2 ts=2:
import BundleTracker from 'webpack-bundle-tracker';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: '`#{_dirname}/app/index.html`',
  filename: 'index.html',
  inject: 'body',
});


// module.exports = {
//   context: __dirname,

//   entry: [
//       './js/index', // Your appʼs entry point
//   ],

//   output: {
//     path: path.resolve('../univjobs-back/student_job/assets/bundles/'),
//       // filename: '[name]-[hash].js',
//       filename: '[name]-[hash].js',
//       publicPath: 'http://localhost:3000/assets/bundles/' // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
//   },

//   plugins: [
//     new BundleTracker({filename: './webpack-stats.json'}),
//   ],

//   module: {
//     loaders: [
//       // we pass the output from babel loader to react-hot loader
//       { test: /\.js?$/,
//         loaders: ['react-hot', 'jsx', 'babel?presets[]=react'],
//         exclude: /node_modules/
//       },
//     ],
//   },

//   resolve: {
//     modulesDirectories: ['node_modules', 'bower_components'],
//     extensions: ['', '.js', '.jsx']
//   }
// }

/* Equate to 'npm run start'  */
const LAUNCH_COMMAND = process.env.npm_lifecycle_event;
/* Launch production if true */
const isProduction = LAUNCH_COMMAND === 'production';
/* Determines whether npm run start is in production or development */
process.env.BABEL_ENV = LAUNCH_COMMAND;
/* Create a production plugin and reduce size of build */
const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
});


/* Base directory */
const base = {
  entry: [
    PATHS.app,
  ],
  output: {
    path: '../univjobs-back/student_job/assets/bundles/',
    filename: 'index_bundle.js',
  },
  plugins: [
    new BundleTracker({ filename: './webpack-stats.json' }),
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      /* Hash included to allow css module loader*/
      { test: /\.css$/, loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]' },
    ],
  },
  resolve: {
    /* Deletes to absolute path when importing files*/
    root: path.resolve('./app'),
  },
};

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()],
};

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HTMLWebpackPluginConfig, productionPlugin],
};

// Need to merge two objects together[base with production or development]
export default Object.assign({}, base,
                             isProduction === true ? productionConfig : developmentConfig
                            );
