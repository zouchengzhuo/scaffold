/**
 * Created by czzou on 2016/1/18.
 */
var gulp=require("gulp");
var gutil = require('gulp-util');
var concat = require('gulp-concat')
var webpack=require("webpack");
var gwebpack=require("gulp-webpack");
var webpackconfig=require("./webpack.config.js");
var webpackconfig_dev=require("./webpack.config.dev.js");
var WebpackDevServer = require("webpack-dev-server");
var path=require("path");
var fs=require("fs");

/**
 * 合并lib文件
 */
gulp.task('concat-lib',function(){
    gulp.src(['vue/dist/vue.min.js','vue-router/dist/vue-router.min.js'],{
        cwd:'../lib'
    }).pipe(concat('vue.min.js')).pipe(gulp.dest('../release'));
})

gulp.task('webpack',['concat-lib'],function () {
    var config = Object.create(webpackconfig_dev);
    webpack(config, function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({}));
    })
});
gulp.task('webpack-release',['concat-lib'],function () {
    var config = Object.create(webpackconfig);
    webpack(config, function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({}));
    });
});

/**
 * 启动hot dev server
 */
gulp.task('start-dev-server',['concat-lib'],function(){
    var config = Object.create(webpackconfig_dev);
    //这两项配置原本是在webpack.config.dev.js里边配置，可是通过gulp启动devserver，那种配置无效，只能在此处写入
    //官网的解释是webpack-dev-server没有权限读取webpack的配置
    config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    var compiler = webpack(config);
    var server = new WebpackDevServer(compiler, {
        contentBase: "../",
        //此配置用于改变dev server的静态文件路径，不写的话app.bundle.js默认是在根目录下访问到
        publicPath: "/release/",
        hot: true,
        compress: false,
        stats: { colors: true }
    });
    server.listen(8080, "localhost", function() {});
    // server.close();
})

gulp.task("default",["start-dev-server"]);
gulp.task("release",["webpack-release"]);