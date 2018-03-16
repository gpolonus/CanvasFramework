var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'jquery': 'jquery/dist/jquery.min.js',
      'axios': 'axios/dist/axios.min.js',
    },
    modules: [
      'node_modules'
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: './'
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}