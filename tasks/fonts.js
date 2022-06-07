import { src, dest } from 'gulp';
import debug from 'gulp-debug';
import { paths } from './paths';

export const fonts = () =>
  src(paths.fonts.src)
    .pipe(debug({ title: 'fonts copied: ' }))
    .pipe(dest(paths.fonts.output));
