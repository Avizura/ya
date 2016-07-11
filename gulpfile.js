var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

//compile jade to HMTL
gulp.task('templates', function() {
    gulp.src('./src/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/task1'))
});

//compile scss to css
gulp.task('css', function() {
    return gulp.src("src/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['>1%'],
            cascade: false
        }))
        .pipe(gulp.dest("./dist/task1"));
});
