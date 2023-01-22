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
  pages,
  webconfigs,
} from './tasks';

export const server = browserSync.create();

export const copyAssets = parallel(
  fonts,
  webconfigs,
  parallel(images, createWebp),
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
    notify: false,
  });

  watch(paths.pages.srcWatch, series(pages, refresh));
  watch(paths.styles.src, styles);
  watch(paths.images.src, parallel(images, createWebp));
  watch(paths.images.spriteSrc, series(svgSprite, refresh));
  watch(paths.scripts.src, series(scripts, refresh));
};

export const generateSprite = svgSprite;

export const build = series(
  clear,
  parallel(copyAssets, generateSprite),
  series(scripts),
  parallel(styles, pages),
);

export default series(
  clear,
  parallel(copyAssets, generateSprite),
  series(scripts),
  parallel(styles, pages),
  serve,
);
