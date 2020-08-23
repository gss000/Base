<center>
    <h2>webpack</h2>
</center>

#### webpack配置说明

- 【mode】
     * production 生产且有预设插件 
     * development 开发且有预设插件 
     * none 无 

- 【devtool】
    * 开发环境中使用source-map方便调试

- 【entry】文件入口
    * node的glob模块允许你使用 *等符号, glob规则,获取匹配对应规则的文件。

- 【output】输出配置
    * 可以有多个入口但仅一个出口

- 【optimization】代码压缩优化
    * minimize 压缩 
    * minimizer 第三方插件
    * splitChunks 压缩优化（可以配置按需加载）
    * runtimeChunk 映射关系

- 【resolve】模块路径的解析

- 【module】模块解析
    * strictExportPresence: true; 设置更加严格匹配，使缺少export的直接报错而不是warning。
    * rules: [数组对象] 用于配置loader对js、css、babel等支持，三种写法如下
    ```javascript
        // 第一种写法
        rules: [ { test: /\.(js|jsx)$/, loader: 'babel-loader' } ] 
        // 第二种写法
        rules: [ 
            { 
                test: /\.(js|jsx)$/, 
                use: [ { loader: '', options: '单个'/{多个} } ] 
            }
         ]
         // 第三种写法,和以上两种写法一直只是在外面又包了一层oneOf属性，会读取所有的loader并且最后一个会自动兜底
         rules: [{
            oneOf: [
                { 
                    test: /\.(css|less)$/, 
                    use: [{loader: 'style-loader'}] 
                    
                },
            ]
         }]
    ```

- 【plugins】插件配置，数组接受不同的插件，并在此实例化插件并传递参数。


#### webpack命令

- webpack -p 压缩脚本
- webpack -d 生成map映射文件，告知哪些模块最终被打包到哪里
- webpack -w 或 --watch 监听变动并自动打包
- webpack --config xxx.js 使用指定配置文件
- webpack-dev-server --hot(热更新)  --progress --colors --content-base src(content-base会默认读取src目录下文件)

#### 基本配置

1. webpack及npm初始化
    * npm init
    * npm install --save-dev webpack  
    * npm install --save-dev webpack-cli
    * 新增webpack.config.js配置参数，安装必要webpack插件：webpack-dev-server html-webpack-plugin clean-webpack-plugin。
    * package.json中配置webpack命令以及新建公用html模板
    ```
      "scripts": {
        "dev": "webpack-dev-server --hot --progress --colors --content-base src",
        "build": "webpack --config webpack.config.js --colors --progress"
      }
    ```

2. 必要模块和插件
    * 安装babel：@babel/cli @babel/core @babel/plugin-syntax-class-properties  @babel/plugin-transform-runtime @babel/polyfill @babel/preset-env @babel/preset-react babel-loader，并在package.json中配置babel。
    ```
        "babel": {
            "presets": [
                "@babel/preset-env",
                "@babel/preset-react"
            ]
        }
    ```
    * 安装css和资源loader：autoprefixer css-loader file-loader postcss-cli postcss-loader postcss-nested style-loader url-loader,并在webpack.config中配置相应的规则
    * 安装 react react-dom react-router-dom

#### webpack.config.js参考
```javascript
    'use strict'
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
    }
    const fileEntries = getEntryPaths('src/*/app.js');
    const moduleFolders = fs.readdirSync('./src');
    const moduleHTML = [];
    moduleFolders.forEach(moduleName => {
      moduleHTML.push(new HtmlWebpackPlugin({
        title: moduleName,
        template: './public/index.html',
        filename: `${moduleName}.html`,
        hash: false,
        inject: 'body',
        chunks: [moduleName]
      }));
    });
    
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
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
      ].concat(moduleHTML).filter(Boolean)
    }
```


