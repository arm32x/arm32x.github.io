const gulp = require("gulp");

const browserSync = require("browser-sync");

const sass = require("gulp-sass");
const babel = require("gulp-babel");

const extReplace = require("gulp-ext-replace");


gulp.task("server", ["sass", "babel"], () => {
    browserSync.init({
        server: ".",
        open: false
    });
    
    gulp.watch("scss/main.scss", ["sass"]);
    gulp.watch("js/*.es6.js", ["babel"]).on("change", browserSync.reload);
    gulp.watch("**/*.html").on("change", browserSync.reload);
});


gulp.task("sass", () => {
    return gulp.src("scss/main.scss")
        .pipe(sass({ includePaths: ["./scss/"] }))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task("babel", () => {
    return gulp.src("js/**/*.es6.js")
        .pipe(babel({
            "presets": ["env"]
        }))
        .pipe(extReplace(".js", ".es6.js"))
        .pipe(gulp.dest("js"));
});


gulp.task("default", ["server"]);
