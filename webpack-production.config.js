var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var postcssImport = require('postcss-import');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

var config = {
  entry: [path.join(__dirname, '/src/index.jsx')],
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  devtool: 'source-map',
  output: {
    path: buildPath,
    filename: 'app.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "src")],
        exclude: [nodeModulesPath]
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },
  postcss: function () {
    return [
      autoprefixer,
      precss,
      postcssImport({
        addDependencyTo: webpack
      })
    ];
  },
  eslint: {
    configFile: '.eslintrc'
  },
};

module.exports = config;
