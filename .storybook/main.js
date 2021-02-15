const path = require('path');
const glob = require('glob');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: (config) => {
    // Add support for SCSS stylesheets
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
              localIdentName: 'half_earth__[local]',
            },
            importLoaders: 2,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
            includePaths: ['../node_modules', '../src/css']
              .map((d) => path.join(__dirname, d))
              .map((g) => glob.sync(g))
              .reduce((a, c) => a.concat(c), []),
            },
          },
        },
      ],
    });

    return config;
  },
};