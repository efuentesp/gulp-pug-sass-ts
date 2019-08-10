const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const typescript = require("gulp-typescript");
const browserSync = require("browser-sync").create();

// function clean() {
//   return gulp
//     .src('./dist', {read: false})
//     .pipe(vinylPaths(del))
// }

function pugIt() {
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

function sassIt() {
  return gulp
    .src(["./src/views/styles/main.scss", "./src/views/pages/**/*.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./dist/assets/css"))
    .pipe(browserSync.stream());
}

function typescriptIt() {
  return gulp
    .src("./src/views/pages/**/*.ts")
    .pipe(
      typescript({
        target: "ES3",
        module: "none"
      })
    )
    .pipe(gulp.dest("./dist/assets/scripts"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch(
    ["./src/views/styles/main.scss", "./src/views/pages/**/*.scss"],
    gulp.series(["sassIt"])
  );
  gulp.watch("./**/*.pug", gulp.series(["pugIt"]));
  gulp.watch("./ts/**/*.ts", gulp.series(["typescriptIt"]));
}

exports.sassIt = sassIt;
exports.pugIt = pugIt;
exports.typescriptIt = typescriptIt;
exports.watch = watch;
