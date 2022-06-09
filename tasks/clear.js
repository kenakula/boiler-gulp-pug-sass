import del from 'del';
import { BUILD_PATH } from '../paths';

export const clear = () => del(BUILD_PATH);
