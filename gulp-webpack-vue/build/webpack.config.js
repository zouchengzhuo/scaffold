/**
 * Created by czzou on 2016/1/20.
 */
var webpack = require('webpack');
module.exports={
    entry: [
            './public/js/app.js'
        ],
    output:{
        //配合gulp使用的时候注释掉path配置，生成目录在gulp中配置
        //path:"./dist/js",
        publicPath: '/release/js/',
        filename:"app.bundle.min.js"
    },
    externals: {
        'vue': 'Vue',
        '$': 'jQuery'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: true,
                warnings: false
            }
        })
    ]
}