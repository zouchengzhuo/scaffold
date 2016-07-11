/**
 * Created by czzou on 2016/1/20.
 */
var webpack = require('webpack');
var path=require('path');
module.exports={
    //这里写成数组是为了dev server插入服务配置
    entry: {
        "app":['../src/app.js'],
    },
    output:{
        path:path.resolve(__dirname, "../release"),//__dirname+'/../release',
        publicPath: "/release/",//dev server 会从此路径去拿hot-update.json
        filename:'[name].bundle.js'
    },
    externals: {
        'vue': 'Vue',
        'vue-router':'VueRouter'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {test:/\.html$/,loader:'html-loader'}
        ]
    },
    plugins: [

    ],
    devtool: "source-map"
}