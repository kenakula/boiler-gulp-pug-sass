import fs from 'fs';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import { dest, src } from 'gulp';
import { paths } from '../paths';
import debug from 'gulp-debug';

const fileExist = filepath => {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
};

// eslint-disable-next-line consistent-return
export const svgSprite = cb => {
  if (fileExist(paths.images.spritePath)) {
    return src(paths.images.spriteSrc)
      .pipe(svgmin({ plugins: [{ removeViewBox: false }] }))
      .pipe(svgstore({ inlineSvg: true }))
      .pipe(debug({ title: 'sprite generated: ' }))
      .pipe(dest(paths.images.dest));
  }

  cb();
};
