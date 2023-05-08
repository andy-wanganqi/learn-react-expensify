const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: {
      import: './src/app.jsx',
      dependOn: 'shared',
    },
    shared: 'react'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Expensify',
    template: path.resolve(__dirname, './src/index.html'),
    favicon: path.resolve(__dirname, './src/assets/favicon.png'),
  })],
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.jsx$/,
      exclude: /node_modules/
    }, {
      use: ['style-loader', 'css-loader'],
      test: /\.css$/
    }, {
      use: ['style-loader', 'css-loader', 'sass-loader'],
      test: /\.scss$/
    }]
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    historyApiFallback: true,
    compress: true,
    port: 8080
  }
}