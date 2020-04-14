"use strict";
// gulpfile.js - файл, в котором описано, как пакетам взаимодействовать друг с другом
// чтобы работала автоматизация
// require - требовать, вызывать
var gulp = require("gulp"); // менеджер задач для автоматического выполнения 
// рутинных операций, чтобы пакеты, которые скачиваем, работали вместе
// var less = require("gulp-less"); // пакет для работы препроцессора less
var plumber = require("gulp-plumber"); // обнаруживает ошибку, при этом 
// программа не останавливается
var postcss = require("gulp-postcss"); // в данном случае - чтобы работал 
// автопрефиксер. позволяет запускать большинство задач, 
// к-е написаны для ее плагинов
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create(); // позволяет запустить
// локально сервер
var minify = require("gulp-csso"); // позволяет минифицировать css
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin"); // позволяет минифицировать img
var webp = require("gulp-webp"); // для создания изображений в формате webp
// var svgstore = require("gulp-svgstore"); // для создания svg-спрайтов
// var posthtml = require("gulp-posthtml"); // шаблонизатор для того, чтобы 
// инлайнить svg-sprite в шаблоны
// var include = require("posthtml-include"); // для вставки в html нужного контента
var del = require("del"); // плагин для удаления
var uglify = require('gulp-uglify-es').default; // плагин для минификации js, поддерживает es6

gulp.task("css", function () {
  // return gulp.src("source/less/style.less")
  return gulp.src("source/css/*.css")
    .pipe(plumber())
    // .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("js", function () {
  return gulp.src("source/js/*.js")
      .pipe(plumber())
      // .pipe(uglify(/* options */))
      .pipe(gulp.dest("build/js"))
      .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

// gulp.task("sprite", function () {
//   return gulp.src("source/img/icon-*.svg")
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(rename("sprite.svg"))
//     .pipe(gulp.dest("build/img"));
// });

gulp.task("html", function () {
  return gulp.src("source/*.html")
    //  .pipe(posthtml([
    //   include()
    // ]))
    .pipe(gulp.dest("build"));
});


gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff, woff2}",
      "source/img/**",
      ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

// build - чтобы автоматизировать процесс последовательного запуска taskов
gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  // "sprite",
  "html",
  "js",
  ));

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  // gulp.watch - команда, встроенная в gulp. она следит за изменениями файлов
  gulp.watch("source/css/**/*.css", gulp.series("css"));
  // gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
});


gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series("build", "server"));