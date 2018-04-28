module.exports = function() {
  return {
    module: {
      rules: [
        {
          //test: /\.(jpg|jpeg|gif|png|svg)$/,
          test: /\.(jpg|jpeg|gif|png)$/,
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
          },
        },
      ],
    },
  };
};
