import { dest, src } from 'gulp';
import gulpPlumber from 'gulp-plumber';
import pug from 'gulp-pug';
import debug from 'gulp-debug';
import cached from 'gulp-cached';
import gulpIf from 'gulp-if';
import { BUILD_PATH, paths } from './paths';
import htmlmin from 'gulp-htmlmin';

const isDev = process.env.NODE_ENV === 'development';

export const views = () =>
  src(paths.views.src)
    .pipe(
      gulpPlumber({
        errorHandler: function (err) {
          console.log(err.message);
          this.emit('task ended');
        },
      }),
    )
    .pipe(pug({ pretty: true }))
    .pipe(cached('views'))
    .pipe(debug({ title: 'pages compiled: ' }))
    .pipe(
      gulpIf(
        !isDev,
        htmlmin(
          { collapseWhitespace: true },
          debug({ title: 'html minified' }),
        ),
      ),
    )
    .pipe(dest(BUILD_PATH));
