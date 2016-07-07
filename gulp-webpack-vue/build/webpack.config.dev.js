/**
 * Created by czzou on 2016/1/20.
 */
var webpack = require('webpack');
module.exports={
    entry: {
        index:'./src/js/app.js'
    },
    output:{
        path:'./release',
        filename:'[name].js'
    },
    externals: {
        'vue': 'Vue'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()  // 发生错误时不加载
    ],
    module:{
        loaders:[
            { test: /\.css$/, loader: 'style-loader!css-loader!resolve-url-loader' },
        ]
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: true,
                warnings: false
            }
        })
    ]
}