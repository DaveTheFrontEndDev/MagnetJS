const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const webserver = require('gulp-webserver');
const watch = require('gulp-watch');
const browserify = require('gulp-browserify');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('build', () => {
  return gulp.src('src/*')
    .pipe(babel({
      presets: ["env"]
    }))
    .pipe(concat('magnet.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('server', () => {
  return gulp.src(['example/html','dist'])
    .pipe(webserver({
      fallback: 'index.html',
      path: '/',
      livereload: true,
      directoryListing: false,
      open: true
    }));
})

gulp.task('watch', () => {
  return watch('src/*', function () {
    gulp.src('src/Magnet.js')
      .pipe(browserify({
        insertGlobals : true,
        debug : true
      }))
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(concat('magnet.min.js'))
      .pipe(babel({
        presets: ["env"]
      }))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dist'));
  });
});

gulp.task('dev', ['watch','server'])

gulp.task('default', ['build'] );