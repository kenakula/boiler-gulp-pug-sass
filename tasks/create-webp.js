import { dest, src } from 'gulp';
import { paths } from '../paths';
import webp from 'gulp-webp';

export const createWebp = () =>
  src(paths.images.webpSrc).pipe(webp()).pipe(dest(paths.images.dest));
