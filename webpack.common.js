const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    index: {
      import: './src/app.jsx',  
      dependOn: ['react'],
    },
    react: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux', "@reduxjs/toolkit"],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Expensify',
      template: path.resolve(__dirname, './src/index.html'),
      favicon: path.resolve(__dirname, './src/assets/favicon.png'),
    }),
    new Dotenv(),
  ],
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.jsx$/,
      exclude: /node_modules/
    }, {
      use: [
        "style-loader",
        'css-loader', 'postcss-loader'
      ],
      test: /\.css$/
    }, {
      use: [
        "style-loader",
        'css-loader', 'postcss-loader', 'sass-loader'
      ],
      test: /\.scss$/
    }]
  },
};
