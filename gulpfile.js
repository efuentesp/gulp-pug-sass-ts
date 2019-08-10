const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const replace = require("gulp-replace");
const sourcemaps = require("gulp-sourcemaps");
const typescript = require("gulp-typescript");
const browserSync = require("browser-sync").create();
const lec = require("gulp-line-ending-corrector");

// function clean() {
//   return gulp
//     .src('./dist', {read: false})
//     .pipe(vinylPaths(del))
// }

function pugIt() {
  return (
    gulp
      .src("./src/views/pages/**/*.pug")
      .pipe(
        pug({
          pretty: true
        })
      )
      // .pipe(replace(/(\.)pug/g, ".html"))
      // .pipe(replace(/(\.)scss/g, ".css"))
      // .pipe(replace(/(\.)ts/g, ".js"))
      .pipe(lec())
      .pipe(gulp.dest("./dist"))
      .pipe(browserSync.stream())
  );
}

function sassIt() {
  return gulp
    .src(["./src/views/styles/main.scss", "./src/views/pages/**/*.scss"])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"]
      })
    )
    .pipe(sourcemaps.write())
    .pipe(lec())
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
    .pipe(lec())
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
    sassIt
  );
  gulp.watch("./**/*.pug", pugIt);
  gulp.watch("./ts/**/*.ts", typescriptIt);
}

exports.sassIt = sassIt;
exports.pugIt = pugIt;
exports.typescriptIt = typescriptIt;
exports.watch = watch;

exports.default = gulp.series(
  gulp.parallel(pugIt, sassIt, typescriptIt),
  watch
);
