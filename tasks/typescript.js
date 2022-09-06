import { dest, src } from 'gulp';
import { paths } from '../paths';
import ts from 'gulp-typescript';

const tsProject = ts.createProject('tsconfig.json');

export const typescript = () =>
  src(paths.scripts.ts.src)
    .pipe(tsProject(ts.reporter.defaultReporter()))
    .pipe(dest(paths.scripts.ts.dest));
