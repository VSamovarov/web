module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                sourceMap: true,
                presets: ['env', 'stage-3'],
                plugins: [
                  [
                    'babel-plugin-transform-builtin-extend',
                    {
                      globals: ['Error'],
                    },
                  ],
                ],
              },
            },
          ],
        },
      ],
    },
  };
};
