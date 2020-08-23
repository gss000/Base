'use strict'

const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { entriesIn } = require('lodash');

const resolvePath = paths => path.resolve(__dirname, paths);
const buildPath = resolvePath('./dist');

// 多入口匹配
const getEntryPaths = paths => {
  const filePaths = glob.sync(paths);
  const entries = {};

  filePaths.forEach(item => {
    const pathArr = item.split('/');
    const moduleKey = pathArr[pathArr.length - 2];
    entries[moduleKey.toLowerCase()] = `./${item}`;
  });
  return entries;
}
const fileEntries = getEntryPaths('src/*/app.js');

module.exports = {
  entry: fileEntries,
  output: {
    path: buildPath,
    filename: '[name].[hash:6].js'
  },
  devServer: {
    inline: true,
    host: 'localhost',
    port: 9000,
    compress: true,
    hot: true
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader')
          },
          {
            test: /\.(css|less)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  plugins: [
                    require('autoprefixer'),
                    require('postcss-nested')
                  ]
                }
              }
            ]
          },
          {
            test: [/\.bmp$/, /\.jpe?g$/, /\.png$/, /\.gif$/],
            loader: require.resolve('url-loader')
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'demo',
      template: './public/index.html',
      filename: 'demo.html',
      hash: false,
      inject: 'body',
      chunks: ['demo']
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}