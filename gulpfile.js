const gulp = require("gulp");
const del = require("del");
const vinylPaths = require("vinyl-paths");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const purgeCSS = require("gulp-purgecss");
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
const wrapper = require("gulp-wrapper");

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
      //.pipe(imagemin())
      .pipe(gulp.dest("./dist/assets/images"))
  );
}

function pugIt() {
  return gulp
    .src("./src/views/pages/**/index.pug")
    .pipe(
      pug({
        pretty: true,
        basedir: __dirname + "/src/views/"
      })
    )
    .pipe(lec())
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
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
  return (
    gulp
      .src(["./src/views/pages/**/*.ts"])
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(
        typescript({
          target: "ES5",
          module: "AMD",
          removeComments: false
        })
      )
      // .pipe(uglify())
      // .pipe(
      // 	wrapper({
      // 		header: '$(document).ready(()=> {\n',
      // 		footer: '});\n'
      // 	})
      // )
      .pipe(sourcemaps.write("../maps"))
      .pipe(lec())
      .pipe(gulp.dest("./dist/assets/scripts"))
      .pipe(browserSync.stream())
  );
}

function webfonts() {
  return gulp
    .src(["./node_modules/@fortawesome/fontawesome-free/webfonts/*"])
    .pipe(gulp.dest("./dist/assets/webfonts"));
}

function concatVendorCss() {
  return (
    gulp
      .src([
        "./node_modules/@fortawesome/fontawesome-free/css/all.min.css",
        "./node_modules/tailwindcss/dist/tailwind.min.css",
        "./src/views/styles/vendors/jqgrid/ui.jqgrid.min.css",
        // "./src/views/styles/vendors/jqgrid/jqgrid.css",
        "./node_modules/select2/dist/css/select2.min.css"
        // "./node_modules/jquery-file-upload/css/uploadfile.css"
      ])
      // .pipe(
      //   purgeCSS({
      //     content: ["./dist/**/*.html"],
      //     whitelistPatterns: [/select2/, /jqgrid/]
      //   })
      // )
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 2 versions"]
        })
      )
      .pipe(concat("libs.min.css"))
      .pipe(gulp.dest("./dist/assets/css"))
  );
}

function purgeCssIt() {
  return gulp
    .src(["./dist/assets/css/vendors.min.css"])
    .pipe(
      purgeCSS({
        content: ["./dist/**/*.html"],
        whitelistPatterns: [/select2/, /jqgrid/]
      })
    )
    .pipe(gulp.dest("./dist/assets/css/purged"));
}

function concatJQueryJs() {
  return gulp
    .src([
      "./node_modules/jquery/dist/jquery.min.js",
      "./src/views/scripts/vendors/jquery-ui.min.js"
    ])
    .pipe(concat("jquery.min.js"))
    .pipe(gulp.dest("./dist/assets/scripts"));
}

function concatVendorJs() {
  return gulp
    .src([
      "./node_modules/parsleyjs/dist/parsley.min.js",
      "./node_modules/parsleyjs/dist/i18n/es.js",
      "./node_modules/select2/dist/js/select2.min.js",
      "./node_modules/select2/dist/js/i18n/es.js",
      "./src/views/pages/scripts/vendors/jqgrid/jqgrid.js"
      // "./node_modules/jquery-file-upload/js/jquery.uploadfile.min.js"
    ])
    .pipe(concat("libs.min.js"))
    .pipe(gulp.dest("./dist/assets/scripts"));
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
exports.webfonts = webfonts;
exports.concatVendorCss = concatVendorCss;
exports.purgeCssIt = purgeCssIt;
exports.concatJQueryJs = concatJQueryJs;
exports.concatVendorJs = concatVendorJs;
exports.watch = watch;

exports.default = gulp.series(
  clean,
  gulp.parallel(pugIt, sassIt, typescriptIt, imageminIt),
  webfonts,
  concatVendorCss,
  concatJQueryJs,
  concatVendorJs
);

exports.dev = gulp.series(
  clean,
  gulp.parallel(pugIt, sassIt, typescriptIt, imageminIt),
  webfonts,
  concatVendorCss,
  concatJQueryJs,
  concatVendorJs,
  watch
);
