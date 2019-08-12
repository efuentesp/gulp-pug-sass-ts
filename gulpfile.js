const gulp = require("gulp");
const del = require("del");
const vinylPaths = require("vinyl-paths");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const changed = require("gulp-changed");
// const replace = require("gulp-replace");
const sourcemaps = require("gulp-sourcemaps");
const typescript = require("gulp-typescript");
const browserSync = require("browser-sync").create();
const lec = require("gulp-line-ending-corrector");

function clean() {
  return gulp
    .src("./dist", { read: false, allowEmpty: true })
    .pipe(vinylPaths(del));
}

function imageminIt() {
  return (
    gulp
      .src("./src/images/*")
      // .pipe(changed("./dist/assets/images"))
      .pipe(imagemin())
      .pipe(gulp.dest("./dist/assets/images"))
  );
}

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
    .pipe(
      sass({
        sourceComments: false
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"]
      })
    )
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("../maps"))
    .pipe(lec())
    .pipe(gulp.dest("./dist/assets/css"))
    .pipe(browserSync.stream());
}

function typescriptIt() {
  return gulp
    .src(["./src/views/pages/**/*.ts"])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      typescript({
        target: "ES3",
        module: "none",
        removeComments: true
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write("../maps"))
    .pipe(lec())
    .pipe(gulp.dest("./dist/assets/scripts"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    port: 8080,
    open: false,
    reloadOnRestart: true,
    notify: false
  });

  gulp.watch(
    ["./src/views/styles/**/*.scss", "./src/views/pages/**/*.scss"],
    sassIt
  );
  gulp.watch("./src/views/pages/**/*.pug", pugIt);
  gulp.watch("./src/views/mixins/**/*.pug", pugIt);
  gulp.watch("./src/views/templates/**/*.pug", pugIt);
  gulp.watch("./src/views/pages/**/*.ts", typescriptIt);
  gulp.watch(["./src/images/**/*"], imageminIt);
}

exports.clean = clean;
exports.imageminIt = imageminIt;
exports.sassIt = sassIt;
exports.pugIt = pugIt;
exports.typescriptIt = typescriptIt;
exports.watch = watch;

exports.default = gulp.series(
  clean,
  gulp.parallel(pugIt, sassIt, typescriptIt, imageminIt)
);

exports.dev = gulp.series(
  clean,
  gulp.parallel(pugIt, sassIt, typescriptIt, imageminIt),
  watch
);
