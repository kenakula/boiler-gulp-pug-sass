import { dest, src } from "gulp";
import plumber from "gulp-plumber";
import sassGlob from "gulp-sass-glob";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import sourcemap from "gulp-sourcemaps";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import objectFitImages from "postcss-object-fit-images";
import inlineSVG from "postcss-inline-svg";
import mqpacker from "css-mqpacker";
import csso from "gulp-csso";
import rename from "gulp-rename";
import debug from "gulp-debug";
import { paths } from "./paths";

const sass = gulpSass(dartSass);
const postCssPlugins = [
  autoprefixer({ grid: true, flexbox: true }),
  mqpacker({
    sort: true,
  }),
  inlineSVG(),
  objectFitImages(),
];

export const styles = () =>
  src(paths.styles.inputFile)
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.error(err.message);
          this.emit("task ended");
        },
      })
    )
    .pipe(sourcemap.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss(postCssPlugins))
    .pipe(dest(paths.styles.dest))
    .pipe(csso())
    .pipe(rename(paths.styles.minifyFileName))
    .pipe(sourcemap.write("."))
    .pipe(debug({ title: "css compiled: " }))
    .pipe(dest(paths.styles.dest));
