'use strict'

const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: '',
  output: {
    path: buildPath,
    filename: '[name].[hash:6].js'
  },
  module: {
    rules: [
      {
        oneOf: [
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
                    requir('postcss-nested')
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
    new HtmlWebpackPlugin({}),
  ]
}