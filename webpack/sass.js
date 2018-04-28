const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');

module.exports = function(env, options) {
  return {
    plugins: [
      new MiniCssExtractPlugin({
        // filename: 'css/[name].[hash].css',
        // chunkFilename: 'css/[id].[hash].css',
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.s?[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: [
                  autoprefixer({
                    browsers: ['ie >= 8', 'last 4 version'],
                  }),
                  mqpacker({
                    sort: true,
                  }),
                ],
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
  };
};
