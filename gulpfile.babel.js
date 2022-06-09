import { parallel, series, watch } from 'gulp';
import browserSync from 'browser-sync';
import { BUILD_PATH, paths } from './paths';
import {
  clear,
  createWebp,
  favicons,
  fonts,
  images,
  scripts,
  styles,
  svgSprite,
  videos,
  views,
  webconfigs,
} from './tasks';

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
