/**
 * Created by Shinelon on 2017/7/6.
 */
var gulp=require('gulp'), //gulp基础库
    minifycss=require('gulp-minify-css'),   //css压缩gul
    concat=require('gulp-concat'),   //合并文件
    uglify=require('gulp-uglify'),   //js压缩
    rename=require('gulp-rename'),   //文件重命名
/*    jshint=require('gulp-jshint'),   //js检查*/
    notify=require('gulp-notify'),   //提示
    webserver = require('gulp-webserver'), //webserver
    connect = require("gulp-connect"),      //connect
    htmlmin = require("gulp-htmlmin"),      //html压缩
    imagemin=require('gulp-imagemin');      //image压缩


//webserver实现实时更新
 gulp.task('webserver', function() {
 gulp.src('www')
 .pipe(webserver({
 port:'8080',
 livereload: true,
 directoryListing:{
 path:'www',
 enable:true
 },
 open: true,
 fallback:'index.html'
 }));
 });

//connect实现实时更新
/*gulp.task('connect', function() {
    connect.server({
        root: 'www',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./www/!*.html')
        .pipe(connect.reload());
});
gulp.task('watch', function () {
    gulp.watch(['./www/!*.html'], ['html']);
});

gulp.task('default', ['connect', 'watch']);*/


//合并并压缩css文件
gulp.task('minifycss',function(){
    return gulp.src('www/css/*.css')                 //设置css *代表合并并压缩css文件夹下所有css文件
        .pipe(concat('main.css'))                  //合并css文件到"style.css"
        .pipe(gulp.dest('www/newCss'))            //输出路径  [合并文件]
        .pipe(rename({suffix:'.min'}))              //修改文件名添加.min后缀
        .pipe(minifycss())                          //压缩文件
        .pipe(gulp.dest('www/newCss'))                //输出路径  [压缩文件]
        .pipe(notify({message:'css task ok'}));     //提示成功
});

//合并并压缩js文件
gulp.task('minifyjs',function(){
    return gulp.src("www/js/*.js")           //选择合并的JS文件
        .pipe(concat('main.js'))                 //合并js
        .pipe(gulp.dest('www/newJs'))           //输出路径  [合并文件]
        .pipe(rename({suffix:'.min'}))            //重命名
        .pipe(uglify())                           //压缩
        .pipe(gulp.dest('www/newJs'))           //输出路径  [压缩文件]
        .pipe(notify({message:"ok"}));    //提示
});

// 压缩html文件
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,                   //清除HTML注释
        collapseWhitespace: true,               //压缩HTML
        collapseBooleanAttributes: true,        //省略布尔属性的值      <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,            //删除所有空格作属性值  <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,       //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,    //删除<style>和<link>的type="text/css"
        minifyJS: true,                         //压缩页面JS
        minifyCSS: true                         //压缩页面CSS
    };
    gulp.src('www/index.html')
        .pipe(htmlmin(options))                 //压缩html
        .pipe(gulp.dest('www/newHtml'));      //输出目录  [压缩文件]
});

//压缩图片文件
gulp.task('imagemin', function () {
    gulp.src('www/images/*.*')  //被压缩文件的路径，与js/css/html 同理可传数组指定文件
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('www/newImages')); //输出路径  [压缩后]
});
