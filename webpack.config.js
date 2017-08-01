const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const libraryName = 'particles';

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    particles: './particles.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: libraryName + '.bundle.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'index.ejs',
    inject: 'head'
  })],
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    contentBase: path.resolve(__dirname, './dist'),
    stats: 'errors-only',
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      }
    ],
  }
};
