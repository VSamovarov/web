const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const pug = require('./webpack/pug.js');
const sass = require('./webpack/sass.js');
const babel = require('./webpack/js.babel');
const uglifyJS = require('./webpack/js.uglify.js');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');

const PATHS = {
  source: path.join(__dirname, './assets'),
  templates: path.join(__dirname, './assets', 'templates'),
  build: path.join(__dirname, './dist'),
};

const common = merge([
  {
    entry: {
      index: PATHS.templates + '/index.js',
    },
    output: {
      path: PATHS.build,
      filename: 'js/[name].js',
      //publicPath: 'dist/',
    },
    devServer: {
      overlay: true,
      stats: 'errors-only',
      //port: 9000,
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new CleanWebpackPlugin(PATHS.build),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: PATHS.templates + '/index.pug',
        inject: true, //true || 'head' || 'body' || false
      }),
      new HtmlWebpackPlugin({
        filename: 'page.html',
        template: PATHS.templates + '/page.pug',
        inject: true, //true || 'head' || 'body' || false
      }),
    ],
  },
  sass(),
  babel(),
  images(),
  fonts(),
  pug(),
]);

module.exports = (env, options) => {
  if (options.mode === 'development') {
    common.devtool = 'source-map';
    return merge([common]);
  } else {
    common.devtool = false;
    return merge([common, uglifyJS()]);
  }
};
