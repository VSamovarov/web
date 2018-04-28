const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = function(paths) {
  return {
    plugins: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  };
};
