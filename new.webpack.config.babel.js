
import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import BundleTracker from 'webpack-bundle-tracker'

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
  images: path.join(__dirname, 'images')
}

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: PATHS.app + '/index.html',
  filename: 'index.html',
  inject: 'body'
})

 /* =============================================================
  * ======= SET ENVIRONMENT VARIABLES FOR COMPILED CODE =========
  *
  * When we want to build for prod, we can use webpack.DefinePlugin to 
  * define an object that should be global to the scope of our app.
  * 
  * This setting is going to set process.env.CURRENT_ENV to 'prod' inside
  * of the code that webpack is going to compile for us.
  *
  * TODO: Set ,
    NODE_ENV: JSON.stringify('production') in productionPlugin
  */

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    CURRENT_ENV: JSON.stringify('prod')
  }
})

 /*
  * The "rules" section of this config comes from the link below.
  * It's to be able to load both normal css sheets and webpack modules.
  *
  * https://jaketrent.com/post/load-both-css-and-css-modules-webpack/
  */

const base = {
  entry: [
    PATHS.app
  ],
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.css$/, loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'},
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      { test: /\.gif$/, loader: 'url-loader?mimetype=image/png' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?[name].[ext]" }
    ],
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              ignore: '/node_modules/'  
            }
          }
        ]
      },
      {
        test: /^(?!.*?\.module).*\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.module\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }]
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, "app"),
      "node_modules"
    ]
  }
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
    proxy: {
      '/api/**': {
	     target: 'http://127.0.0.1:8000/',   // Charles' local server
        secure: false,
        changeOrigin: true,
        protocolRewrite: true,
        bypass: function(req, res, proxyOptions) {
          // console.log("RESPONSE", res)
        }
      }
    }
  },
  plugins: [HTMLWebpackPluginConfig, 
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
              'process.env': {
                CURRENT_ENV: JSON.stringify('dev')
              }
            })
  ]
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HTMLWebpackPluginConfig,
   productionPlugin, 
   new BundleTracker({filename: './webpack-stats.json'}),
   new webpack.optimize.DedupePlugin(),
   new webpack.optimize.OccurrenceOrderPlugin(),
   new webpack.optimize.UglifyJsPlugin()
  ]
}

export default Object.assign({}, base, isProduction === true ? productionConfig : developmentConfig)
