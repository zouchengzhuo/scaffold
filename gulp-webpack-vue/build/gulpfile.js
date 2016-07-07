/**
 * Created by czzou on 2016/1/18.
 */
var gulp=require("gulp"),
    webpack=require("gulp-webpack"),
    webpackconfig=require("./webpack.config.js"),
    webpackconfig_dev=require("./webpack.config.dev.js"),
    path=require("path"),
    fs=require("fs");

gulp.task('webpack',function () {
    var myConfig = Object.create(webpackconfig_dev);
    return gulp
        .src('./public/js/app.js')
        .pipe(webpack(myConfig))
        .pipe(gulp.dest('./release/js'));
});
gulp.task('webpack_release',function () {
    var myConfig = Object.create(webpackconfig);
    return gulp
        .src('./public/js/app.js')
        .pipe(webpack(myConfig))
        .pipe(gulp.dest('./release/js'));
});


gulp.task("default",["webpack"]);
gulp.task("release",["webpack_release"]);