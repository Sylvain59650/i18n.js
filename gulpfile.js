//const babel = require("gulp-babel");
const gulp = require("gulp");
const concat = require("gulp-concat");
const debug = require("gulp-debug");
const watch = require("gulp-watch");

const chemins = {
  sources: "./src/",
  distrib: "./distrib/"
};



gulp.task("i18n.min.js", () => {
  return gulp.src([
      "src/**.js"
    ])
    .pipe(concat("i18n.min.js"))
    // .pipe(babel({
    //   presets: ["es2015"],
    //   compact: true
    // }))
    .pipe(debug())
    //.pipe(uglify())
    //.on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    // .pipe(umd())
    .pipe(gulp.dest(chemins.distrib))
});


gulp.task("css", () => {
  return gulp.src([
      "src/**.css"
    ])
    .pipe(concat("i18n.min.css"))
    .pipe(debug())
    .pipe(gulp.dest(chemins.distrib))
});

gulp.task("index.html", () => {
  return gulp.src([
      "src/**.html", "src/*.png"
    ])
    .pipe(debug())
    .pipe(gulp.dest(chemins.distrib))
});

gulp.task("watch:css", function() {
  watch("./src/**.css", function() {
    gulp.run("css");
  });
});

gulp.task("watch:html", function() {
  watch(["./src/index.html", "./src/*.png"], function() {
    gulp.run("index.html");
  });
});

gulp.task("watch:i18n.min.js", function() {
  watch("./src/**.js", function() {
    gulp.run("i18n.min.js");
  });
});


gulp.task("default", ["i18n.min.js", "index.html", "css"]);


gulp.task("all", ["default"]);

gulp.task("watch", ["watch:i18n.min.js", "watch:html", "watch:css"]);