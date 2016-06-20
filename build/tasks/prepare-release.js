var gulp = require('gulp');
var runSequence = require('run-sequence');
var paths = require('../paths');
var fs = require('fs');
var bump = require('gulp-bump');
var args = require('../args');
var conventionalChangelog = require('gulp-conventional-changelog');

gulp.task('changelog', function () {
  return gulp.src(paths.doc + '/CHANGELOG.md', {
    buffer: false
  }).pipe(conventionalChangelog({
    preset: 'angular'
  }))
  .pipe(gulp.dest(paths.doc));
});

gulp.task('changelog', function(callback) {
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  return changelog({
    repository: pkg.repository.url,
    version: pkg.version,
    file: paths.doc + '/CHANGELOG.md'
  }, function(err, log) {
    fs.writeFileSync(paths.doc + '/CHANGELOG.md', log);
  });
});

gulp.task('prepare-release', function(callback){
  return runSequence(
    'build',
    'lint',
    'bump-version',
    'doc',
    'changelog',
    callback
  );
});
