/**
 * Created by czzou on 2016/1/20.
 */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path=require('path');
module.exports={
    entry: {
        index:'../src/app.js'
    },
    output:{
        path:path.resolve(__dirname, "../release"),
        publicPath:"",//TODO 填写生产环境静态文件路径
        filename:'[name].[chunkhash:5].bundle.js'
    },
    externals: {
        'vue': 'Vue',
        'vue-router':'VueRouter'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: true,
                warnings: false
            }
        }),
        new ExtractTextPlugin("[name].css")
    ]
}