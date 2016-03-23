const gulp = require('gulp');
const gutil = require('gulp-util');
const liveServer = require('gulp-live-server');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const hmr = require('browserify-hmr');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const nodemon = require('gulp-nodemon');

const appConfig = require('./app.config');
const port = appConfig.PORT;

const paths = {
   HTML: 'index.html',
   JS: ['client/**/*.js', 'client/**/*.jsx'],
   SOURCE: 'client/app.jsx',
   BUILD: 'build',
   SERVER: 'server/index.js'
 };

gulp.task('default', ['dev']);

gulp.task('dev', ['compile:dev', 'server:dev']);

gulp.task('compile:dev', function() {
  const b = watchify(browserify({
    extensions: ['.js', '.jsx'],
    entries: [paths.SOURCE],
    debug: true,
    transform: [babelify],
    plugin: [hmr]
  }));

  function bundle() {
    return b.bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }

  b.on('update', bundle);
  b.on('error', () => console.log('Browserify ERROR'))
  b.on('bytes', () => console.log('==> Bundle Created'))
  b.on('log', gutil.log);
  return bundle();
});

gulp.task('server:dev', function () {
  nodemon({
    script: paths.SERVER,
    ext: 'js html',
    env: { 'NODE_ENV': 'development' },
    watch: ['server']
  }).on('restart', function () {
    console.log('------ Server restarted ------')
  })
})
