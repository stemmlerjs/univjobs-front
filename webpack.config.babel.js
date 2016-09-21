import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

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

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

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
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'},
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      { test: /\.gif$/, loader: 'url-loader?mimetype=image/png' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?[name].[ext]" }      
    ]
  },
  resolve: {
    root: path.resolve('./app')
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
        target: 'http://ec2-52-87-227-85.compute-1.amazonaws.com:8000',
        secure: false,
        changeOrigin: true,
        protocolRewrite: true,
        bypass: function(req, res, proxyOptions) {
          // console.log("RESPONSE", res)
        }
      }
    }
  },
  plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HTMLWebpackPluginConfig, productionPlugin]
}

export default Object.assign({}, base, isProduction === true ? productionConfig : developmentConfig)