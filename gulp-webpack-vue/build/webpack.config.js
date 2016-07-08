/**
 * Created by czzou on 2016/1/20.
 */
var webpack = require('webpack');
module.exports={
    entry: {
        index:'../src/js/app.js',
        "vue.min":['../lib/vue/dist/vue.min.js','../lib/vue-router/dist/vue-router.min.js']
    },
    output:{
        path:__dirname+'/../release',
        filename:'[name].js'
    },
    externals: {
        'vue': 'Vue',
        'vue-router':'VueRouter'
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