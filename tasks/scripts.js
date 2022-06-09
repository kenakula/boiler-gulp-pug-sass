import { dest, src } from 'gulp';
import webpackStream from 'webpack-stream';
import config from '../webpack.config';
import { paths } from '../paths';

export const scripts = () =>
  src(paths.scripts.inputFile)
    .pipe(webpackStream(config))
    .pipe(dest(paths.scripts.dest));
