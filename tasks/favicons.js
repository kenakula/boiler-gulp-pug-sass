import { dest, src } from 'gulp';
import { paths } from '../paths';

export const favicons = () =>
  src(paths.favicons.src).pipe(dest(paths.favicons.output));
