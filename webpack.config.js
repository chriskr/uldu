'use strict';

const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const babelLoader = {
  loader: 'babel-loader',
  test: /.js$/,
  exclude: /node_modules/,
  options: {
    presets: ['env']
  },
};

module.exports = [];

const baseConfig = {
  output: {
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      babelLoader,
    ],
  },
  optimization: {
    minimize: false,
  },
};

module.exports.push(baseConfig);

if (isProduction) {
  module.exports.push(Object.assign({}, baseConfig, {
    output: {
      filename: 'main.min.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs2',
    },
    optimization: {
      minimize: true,
    },
    module: {
      rules: [
        babelLoader,
      ],
    },
  }));
}
