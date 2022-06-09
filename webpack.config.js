import path from 'path';
import { paths } from './paths';

const mode = process.env.NODE_ENV ?? 'none';
const isDev = process.env.NODE_ENV === 'development';

export default {
  context: path.resolve(__dirname, 'src'),
  mode: mode,
  entry: {
    main: paths.scripts.webpackStream.inputMain,
    vendor: paths.scripts.webpackStream.inputVendor,
  },
  devtool: isDev ? 'source-map' : false,
  output: {
    filename: isDev ? '[name].js' : '[name].min.js',
    path: path.resolve(__dirname, 'build/js'),
  },
  optimization: {
    minimize: isDev ? false : true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
};
