/**
 * Created by Shinelon on 2017/7/6.
 */
var gulp=require('gulp'), //gulp������
    minifycss=require('gulp-minify-css'),   //cssѹ��gul
    concat=require('gulp-concat'),   //�ϲ��ļ�
    uglify=require('gulp-uglify'),   //jsѹ��
    rename=require('gulp-rename'),   //�ļ�������
/*    jshint=require('gulp-jshint'),   //js���*/
    notify=require('gulp-notify'),   //��ʾ
    webserver = require('gulp-webserver'), //webserver
    connect = require("gulp-connect"),      //connect
    htmlmin = require("gulp-htmlmin"),      //htmlѹ��
    imagemin=require('gulp-imagemin');      //imageѹ��


//webserverʵ��ʵʱ����
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

//connectʵ��ʵʱ����
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


//�ϲ���ѹ��css�ļ�
gulp.task('minifycss',function(){
    return gulp.src('www/css/*.css')                 //����css *����ϲ���ѹ��css�ļ���������css�ļ�
        .pipe(concat('main.css'))                  //�ϲ�css�ļ���"style.css"
        .pipe(gulp.dest('www/newCss'))            //���·��  [�ϲ��ļ�]
        .pipe(rename({suffix:'.min'}))              //�޸��ļ������.min��׺
        .pipe(minifycss())                          //ѹ���ļ�
        .pipe(gulp.dest('www/newCss'))                //���·��  [ѹ���ļ�]
        .pipe(notify({message:'css task ok'}));     //��ʾ�ɹ�
});

//�ϲ���ѹ��js�ļ�
gulp.task('minifyjs',function(){
    return gulp.src("www/js/*.js")           //ѡ��ϲ���JS�ļ�
        .pipe(concat('main.js'))                 //�ϲ�js
        .pipe(gulp.dest('www/newJs'))           //���·��  [�ϲ��ļ�]
        .pipe(rename({suffix:'.min'}))            //������
        .pipe(uglify())                           //ѹ��
        .pipe(gulp.dest('www/newJs'))           //���·��  [ѹ���ļ�]
        .pipe(notify({message:"ok"}));    //��ʾ
});

// ѹ��html�ļ�
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,                   //���HTMLע��
        collapseWhitespace: true,               //ѹ��HTML
        collapseBooleanAttributes: true,        //ʡ�Բ������Ե�ֵ      <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,            //ɾ�����пո�������ֵ  <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,       //ɾ��<script>��type="text/javascript"
        removeStyleLinkTypeAttributes: true,    //ɾ��<style>��<link>��type="text/css"
        minifyJS: true,                         //ѹ��ҳ��JS
        minifyCSS: true                         //ѹ��ҳ��CSS
    };
    gulp.src('www/index.html')
        .pipe(htmlmin(options))                 //ѹ��html
        .pipe(gulp.dest('www/newHtml'));      //���Ŀ¼  [ѹ���ļ�]
});

//ѹ��ͼƬ�ļ�
gulp.task('imagemin', function () {
    gulp.src('www/images/*.*')  //��ѹ���ļ���·������js/css/html ͬ��ɴ�����ָ���ļ�
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('www/newImages')); //���·��  [ѹ����]
});
