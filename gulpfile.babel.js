import { parallel, series, watch } from 'gulp';
import { clear } from './tasks/clear';
import { fonts } from './tasks/fonts';
import { images } from './tasks/images';
import { styles } from './tasks/styles';
import { createWebp } from './tasks/create-webp';
import { svgSprite } from './tasks/svg-sprite';
import { scripts } from './tasks/scripts';
import { favicons } from './tasks/favicons';
import { webconfigs } from './tasks/webconfigs';
import { videos } from './tasks/videos';
import browserSync from 'browser-sync';
import { views } from './tasks/views';
import { paths } from './paths';

export const server = browserSync.create();

const compileStyles = styles;
const compileScripts = scripts;

const copyImages = parallel(images, createWebp);
export const copyAssets = parallel(
  fonts,
  webconfigs,
  copyImages,
  videos,
  favicons,
);

const refresh = cb => {
  server.reload();
  cb();
};

const serve = () => {
  server.init({
    server: BUILD_PATH,
    open: false,
  });

  watch(paths.views.srcWatch, series(views, refresh));
  watch(paths.styles.src, compileStyles);
  watch(paths.scripts.src, series(compileScripts, refresh));
  watch(paths.images.src, copyImages, createWebp);
  watch(paths.images.spriteSrc, series(svgSprite, refresh));
};

export const generateSprite = svgSprite;

export const build = series(
  clear,
  parallel(copyAssets, generateSprite),
  parallel(compileStyles, compileScripts, views),
);

export default series(
  clear,
  parallel(copyAssets, generateSprite),
  parallel(compileStyles, compileScripts, views),
  serve,
);
