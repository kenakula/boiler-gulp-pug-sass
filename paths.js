export const SOURCE_PATH = 'src/';
export const BUILD_PATH = 'build/';

export const paths = {
  styles: {
    src: [
      `${SOURCE_PATH}components/**/*.scss`,
      `${SOURCE_PATH}blocks/**/*.scss`,
    ],
    dest: `${BUILD_PATH}css/`,
    inputFile: `${SOURCE_PATH}styles/style.scss`,
    minifyFileName: 'style.min.css',
  },
  scripts: {
    src: `${SOURCE_PATH}js/**/*.js`,
    dest: `${BUILD_PATH}js/`,
    inputFile: `${SOURCE_PATH}js/main.js`,
    webpackStream: {
      inputMain: './js/main.js',
      inputVendor: './js/vendor.js',
    },
  },
  views: {
    src: `${SOURCE_PATH}pug/views/*.pug`,
    srcWatch: [
      `${SOURCE_PATH}components/**/*.pug`,
      `${SOURCE_PATH}blocks/**/*.pug`,
      `${SOURCE_PATH}pug/**/*.pug`,
    ],
    dest: BUILD_PATH,
  },
  images: {
    src: `${SOURCE_PATH}assets/img/**/*.{jpg,png,gif,webp,svg}`,
    webpSrc: `${SOURCE_PATH}assets/img/**/*.{png,jpg}`,
    dest: `${BUILD_PATH}img/`,
    spriteSrc: `${SOURCE_PATH}assets/img/svg-sprite/*.svg`,
    spritePath: `${SOURCE_PATH}assets/img/svg-sprite`,
    spriteFileName: 'sprite.svg',
  },
  fonts: {
    src: `${SOURCE_PATH}assets/fonts/**/*.{woff,woff2}`,
    output: `${BUILD_PATH}fonts/`,
  },
  favicons: {
    src: `${SOURCE_PATH}assets/favicons/*.{png,ico,svg}`,
    output: `${BUILD_PATH}favicons/`,
  },
  manifest: {
    src: `${SOURCE_PATH}assets/*.webmanifest`,
    output: BUILD_PATH,
  },
  browserconfig: {
    src: `${SOURCE_PATH}assets/browserconfig.xml`,
    output: BUILD_PATH,
  },
  video: {
    src: `${SOURCE_PATH}assets/video/**/*.*`,
    output: `${BUILD_PATH}video/`,
  },
};
