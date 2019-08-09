const gulp = require("gulp");
const pug = require("pug");
const sass = require("gulp-saas");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

function pug() {
  return gulp
    .src("./src/pug/**/*.pug")
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
}

function style() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(saas().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 3 versions"]
      })
    )
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch("./scss/**/*.scss", ["style"]);
  gulp.watch("./**/*.pug", ["pug"]);
  gulp.watch("./ts/**/*.ts").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
