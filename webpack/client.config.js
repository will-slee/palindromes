const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    client: './client/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'react', 'stage-0'] },
        }],
      },
    ]
  }
}
