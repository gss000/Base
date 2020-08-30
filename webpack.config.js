'use strict';

const path = require('path');
const fs = require('fs');
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
};
const fileEntries = getEntryPaths('src/*/app.js');
const moduleFolders = fs.readdirSync('./src');
const moduleHTML = [];
moduleFolders.forEach(moduleName => {
	const item = moduleName.charAt(0).toLowerCase() + moduleName.slice(1);
	moduleHTML.push(
		new HtmlWebpackPlugin({
			title: item,
			template: './public/index.html',
			filename: `${item}.html`,
			hash: false,
			inject: 'body',
			chunks: [item],
		})
	);
});

console.log('-----', moduleHTML);

module.exports = {
	entry: fileEntries,
	output: {
		path: buildPath,
		filename: '[name].[hash:6].js',
	},
	devServer: {
		inline: true,
		host: 'localhost',
		port: 9000,
		compress: true,
		hot: true,
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				oneOf: [
					{
						test: /\.(js|jsx)$/,
						exclude: /node_modules/,
						loader: require.resolve('babel-loader'),
					},
					{
						test: /\.(css|less)$/,
						exclude: /node_modules/,
						use: [
							{
								loader: 'style-loader',
							},
							{
								loader: require.resolve('css-loader'),
								options: {
									importLoaders: 1,
								},
							},
							{
								loader: require.resolve('less-loader'),
							},
							{
								loader: require.resolve('postcss-loader'),
								options: {
									plugins: [require('autoprefixer'), require('postcss-nested')],
								},
							},
						],
					},
					{
						test: [/\.bmp$/, /\.jpe?g$/, /\.png$/, /\.gif$/],
						loader: require.resolve('url-loader'),
					},
				],
			},
		],
	},
	plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()]
		.concat(moduleHTML)
		.filter(Boolean),
};
