const gulp = require("gulp");

const browserSync = require("browser-sync");

const sass = require("gulp-sass");
const babel = require("gulp-babel");

const autoprefixer = require("gulp-autoprefixer");

const extReplace = require("gulp-ext-replace");


gulp.task("server", ["serve-all"], () => {
    browserSync.init({
        server: ".",
        open: false
    });
    
    gulp.watch("scss/main.scss", ["serve-css"]);
    gulp.watch("js/*.es6.js", ["serve-js"]);
    gulp.watch("**/*.html", ["serve-html"]);
});


gulp.task("sass", () => {
    return gulp.src("scss/main.scss")
        .pipe(sass({ includePaths: ["./scss/"] }))
        .pipe(gulp.dest("css/proc"));
});

gulp.task("autoprefixer", ["sass"], () => {
    return gulp.src("css/proc/*.css")
        .pipe(autoprefixer({ browsers: ["last 3 versions", "chrome 49", ">10%"] }))
        .pipe(gulp.dest("css"));
});

gulp.task("babel", () => {
    return gulp.src("js/**/*.es6.js")
        .pipe(babel({
            "presets": ["env"]
        }))
        .pipe(extReplace(".js", ".es6.js"))
        .pipe(gulp.dest("js"));
});


gulp.task("serve-css", ["autoprefixer"], () => {
    return gulp.src("css/*.css")
        .pipe(browserSync.stream());
});

gulp.task("serve-js", ["babel"], () => {
    browserSync.reload();
});

gulp.task("serve-html", () => {
    browserSync.reload();
});


gulp.task("serve-all", ["sass", "autoprefixer", "babel"], () => {
    browserSync.reload();
});

gulp.task("default", ["server"]);

