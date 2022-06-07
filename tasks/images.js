import { dest, lastRun, src } from 'gulp';
import debug from 'gulp-debug';
import { paths } from './paths';

export const images = () =>
  src([paths.images.src, `!${paths.images.spriteSrc}`], {
    since: lastRun(images),
  })
    .pipe(debug({ title: 'images copied: ' }))
    .pipe(dest(paths.images.dest));
