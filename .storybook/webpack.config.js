const autoprefixer = require('autoprefixer');

module.exports = {
  sassResources: ['./app/assets/styles/app-variables.scss'],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=3&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss',
          'sass',
          'sass-resources',
        ],
      },
    ],
  },
  postcss: [autoprefixer],
};
