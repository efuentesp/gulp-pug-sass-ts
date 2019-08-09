const gulp = require("gulp");
const pug = require("pug");
const sass = require("gulp-saas");
const autoprefixer = require("gulp-autoprefixer");
const typescript = require("gulp-typescript");
const browserSync = require("browser-sync").create();

// function clean() {
//   return gulp
//     .src('./dist', {read: false})
//     .pipe(vinylPaths(del))
// }

function pug() {
  return gulp
    .src("./src/views/pages/**/*.pug")
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
    .src("./src/views/styles/main.scss")
    .pipe(saas().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 3 versions"]
      })
    )
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
}

function typescript() {
  return gulp
    .src("./src/views/pages/**/*.ts")
    .pipe(
      typescript({
        target: "ES3",
        module: "none"
      })
    )
    .pipe(gulp.dest("./dist/scripts"))
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
  gulp.watch("./ts/**/*.ts", ["typescript"]);
}

exports.style = style;
exports.pug = pug;
exports.typescript = typescript;
exports.watch = watch;
