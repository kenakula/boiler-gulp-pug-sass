import { dest, src } from 'gulp';
import { paths } from './paths';

export const videos = () => src(paths.video.src).pipe(dest(paths.video.output));
