/**
 * Created by czzou on 2016/1/18.
 */
var gulp=require("gulp");
var gutil = require('gulp-util');
var greplace = require('gulp-replace');
var concat = require('gulp-concat')
var webpack=require("webpack");
var webpackConfig=require("./webpack.config.js");
var webpackConfigDev=require("./webpack.config.dev.js");
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

/**
 * 使用测试配置打包，启动hot dev server
 */
gulp.task('webpack-dev',['concat-lib'],function(){
    var config = Object.create(webpackConfigDev);
    //这两项配置原本是在webpack.config.dev.js里边配置，可是通过gulp启动devserver，那种配置无效，只能在此处写入
    //官网的解释是webpack-dev-server没有权限读取webpack的配置
    config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    var compiler = webpack(config);
    var server = new WebpackDevServer(compiler, {
        contentBase: "../",
        publicPath: "/release/",
        hot: true,
        compress: false,
        stats: { colors: true }
    });
    server.listen(8080, "localhost", function() {});
    // server.close();
});

/**
 * 使用正式配置打包
 */
gulp.task('webpack-build',['concat-lib'],function () {
    var config = Object.create(webpackConfig);
    webpack(config, function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({}));
    });
});

gulp.task('upload-source',function(){
    //TODO
    //1.上传刚刚生成的文件到CDN or 线上环境静态服务器
    //2.正则匹配index.html，替换js文件路径为CDN路径，将index.html写入release
    // 此工作可尝试用webpack插件https://github.com/ampedandwired/html-webpack-plugin完成
    gulp.src('../src/index.html')
        //.pipe(greplace(/xxxxx/g,"xxxxx"))
        .pipe(gulp.dest('../release'));
});

gulp.task("default",["webpack-dev"]);
gulp.task("build",["webpack-build"]);
gulp.task("release",["webpack-build","upload-source"]);