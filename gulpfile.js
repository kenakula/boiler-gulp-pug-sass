// services
const { src, series, parallel, lastRun, dest, watch } = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const del = require('del');
const debug = require('gulp-debug');
const server = require('browser-sync').create();
const fs = require('fs');

// styles
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const objectFitImages = require('postcss-object-fit-images');
const inlineSVG = require('postcss-inline-svg');
const mqpacker = require("css-mqpacker");

// html
const pug = require('gulp-pug');
const cached = require('gulp-cached');

// scripts
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

// images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const { reload } = require('browser-sync');

// Images optimizing options
let optimizingPlugins = [
  imagemin.gifsicle({ interlaced: true }),
  imagemin.mozjpeg({ quality: 75, progressive: true }),
  imagemin.optipng({ optimizationLevel: 5 }),
  imagemin.svgo({
    plugins: [
      { removeViewBox: true },
      { cleanupIDs: false },
      { removeRasterImages: true },
      { removeUselessStrokeAndFill: false },
    ]
  })
];

// postCSS plugins options
let postCssPlugins = [
  autoprefixer({ grid: true }),
  mqpacker({
    sort: true
  }),
  inlineSVG(),
  objectFitImages(),
];

// paths
const SOURCE_PATH = 'source/';
const BUILD_PATH = 'build/';
const Paths = {
  styles: {
    src: `${SOURCE_PATH}sass/**/*.scss`,
    dest: `${BUILD_PATH}css/`,
    inputFile: `${SOURCE_PATH}sass/style.scss`,
    minifyFileName: 'style.min.css',
  },
  scripts: {
    src: `${SOURCE_PATH}js/**/*.js`,
    dest: `${BUILD_PATH}js/`,
    inputFile: `${SOURCE_PATH}js/main.js`,
    outputFileName: 'main.min.js',
    vendor: {
      src: `${SOURCE_PATH}js/vendor/**/*.js`,
      outputFileName: 'vendor.min.js',
    },
  },
  html: {
    src: `${SOURCE_PATH}pug/pages/*.pug`,
    srcWatch: `${SOURCE_PATH}pug/**/*.pug`,
    dest: BUILD_PATH,
  },
  images: {
    src: `${SOURCE_PATH}img/**/*.{jpg,png,gif,webp,svg}`,
    webpSrc: `${SOURCE_PATH}img/**/*.{png,jpg}`,
    dest: `${BUILD_PATH}img/`,
    spriteSrc: `${SOURCE_PATH}/img/svg-sprite/*.svg`,
    spriteFileName: 'sprite.svg',
  },
  fonts: {
    src: `${SOURCE_PATH}fonts/**/*.{woff,woff2}`,
    output: `${BUILD_PATH}fonts/`,
  },
  favicons: {
    src: `${SOURCE_PATH}favicons/*.{png,ico,svg}`,
    output: `${BUILD_PATH}favicons/`,
  },
  manifest: {
    src: `${SOURCE_PATH}*.webmanifest`,
    output: BUILD_PATH,
  },
  video: {
    src: `${SOURCE_PATH}video/**/*.*`,
    output: `${BUILD_PATH}video/`,
  }
};

// functions

// compiles pug to html
const compilePug = () => {
  return src(Paths.html.src)
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(pug({ pretty: true }))
    .pipe(cached('pug'))
    .pipe(debug({ title: 'pug compiled:' }))
    .pipe(dest(BUILD_PATH));
};
exports.compilePug = compilePug;

// compiles scss to css and minifies
const compileCss = () => {
  return src(Paths.styles.inputFile)
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss(postCssPlugins))
    .pipe(dest(Paths.styles.dest))
    .pipe(csso())
    .pipe(rename(Paths.styles.minifyFileName))
    .pipe(sourcemap.write('.'))
    .pipe(debug({ title: 'css compiled:' }))
    .pipe(dest(Paths.styles.dest))
    .pipe(server.stream());
};
exports.compileCss = compileCss;

// builds js files
const buildJs = () => {
  return src(Paths.scripts.inputFile)
    .pipe(webpackStream(webpackConfig))
    .pipe(dest(Paths.scripts.dest))
};
exports.buildJs = buildJs;

// copies images
const copyImg = () => {
  return src(Paths.images.src, { since: lastRun(copyImg) })
    // .pipe(rename({ dirname: '' }))
    .pipe(debug({ title: 'images copied:' }))
    .pipe(dest(Paths.images.dest));
};
exports.copyImg = copyImg;

// converts images to webp
const createWebp = () => {
  return src(Paths.images.webpSrc)
    .pipe(webp({ quality: 90 }))
    .pipe(dest(Paths.images.dest));
};
exports.createWebp = createWebp;

// optimizing images
const optimizeImg = () => {
  return src(`${Paths.images.dest}*.{jpg,png,gif,webp,svg}`)
    .pipe(imagemin(optimizingPlugins))
    .pipe(debug({ title: 'optimized:' }))
    .pipe(dest(Paths.images.dest));
};
exports.optimizeImg = optimizeImg;

// generates svg sprite
const generateSvgSprite = () => {
  const svgPath = `${SOURCE_PATH}img/svg-sprite/`;

  if (fileExist(svgPath)) {
    return src(svgPath + '*.svg')
      .pipe(svgmin(function () {
        return { plugins: [{ cleanupIDs: { minify: true } }] }
      }))
      .pipe(svgstore({ inlineSvg: true }))
      .pipe(rename('sprite_auto.svg'))
      .pipe(debug({ title: 'sprite generated' }))
      .pipe(dest(Paths.images.dest));
  }
  else {
    cb();
  }
};
exports.generateSvgSprite = generateSvgSprite;

// refreshes page
const refresh = (done) => {
  server.reload();
  done();
};
exports.refresh = refresh;

// copies assets
const copyAssets = () => {
  return src([
    'source/fonts/**',
    'source/favicon/**',
    'source/video/**',
  ], {
    base: 'source',
  })
    .pipe(dest('build'));
};
exports.copyAssets = copyAssets;

// cleans build dir
const cleanBuildDir = () => {
  return del('build');
};
exports.cleanBuildDir = cleanBuildDir;

// starts local server
const serve = () => {
  server.init({
    server: BUILD_PATH,
    notify: false,
    open: false,
    cors: true,
    ui: false,
  });

  watch(Paths.html.srcWatch, { events: ['all'], delay: 100 }, series(
    compilePug,
    refresh,
  ));

  watch(Paths.styles.src, { events: ['all'], delay: 100 }, series(
    compileCss,
  ));

  watch(Paths.scripts.src, { events: ['all'], delay: 100 }, series(
    buildJs,
    refresh,
  ));

  watch(Paths.images.src, { events: ['all'], delay: 100 }, series(
    parallel(copyImg, createWebp),
  ))

  watch(Paths.images.spriteSrc, { events: ['all'], delay: 100 }, series(
    generateSvgSprite,
    reload,
  ));
};

exports.build = series(
  cleanBuildDir,
  parallel(copyImg, copyAssets, generateSvgSprite),
  parallel(compilePug, createWebp),
  parallel(compileCss, buildJs),
);

exports.default = series(
  cleanBuildDir,
  parallel(copyImg, copyAssets, generateSvgSprite),
  parallel(compilePug, createWebp),
  parallel(compileCss, buildJs),
  serve
);

/**
 * Проверка существования файла или папки
 * @param  {string} path      Путь до файла или папки
 * @return {boolean}
 */
function fileExist(filepath) {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
}
