const path = require('path');

const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

module.exports = function override(config) {
  const updatedConfig = { ...config };
  updatedConfig.resolve = {
    extensions: ['.js', '.jsx', '.scss'],
    plugins: [new DirectoryNamedWebpackPlugin()],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      scenes: path.resolve(__dirname, 'src/containers/scenes'),
      layouts: path.resolve(__dirname, 'src/layouts'),
      pages: path.resolve(__dirname, 'src/pages'),
      icons: path.resolve(__dirname, 'src/assets/icons'),
      logos: path.resolve(__dirname, 'src/assets/logos'),
      styles: path.resolve(__dirname, 'src/styles'),
      router: path.resolve(__dirname, 'src/router'),
      selectors: path.resolve(__dirname, 'src/store/selectors'),
      sideEffects: path.resolve(__dirname, 'src/side-effects'),
      actions: path.resolve(__dirname, 'src/store/actions'),
      utils: path.resolve(__dirname, 'src/utils'),
      constants: path.resolve(__dirname, 'src/constants'),
      redux_modules: path.resolve(__dirname, 'src/store/redux-modules'),
      services: path.resolve(__dirname, 'src/services'),
      reducerRegistry: path.resolve(__dirname, 'src/store/reducerRegistry'),
      sceneConfigs: path.resolve(__dirname, 'src/sceneConfigs'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      images: path.resolve(__dirname, 'src/assets/images'),
      gifs: path.resolve(__dirname, 'src/assets/gifs'),
      sounds: path.resolve(__dirname, 'src/assets/sounds'),
      'store-middleware': path.resolve(__dirname, 'src/store/store-middleware'),
      process: 'process/browser',
    },
    // Needed for Webpack 5
    fallback: {
      fs: false,
      tls: false,
      tty: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      os: false,
      process: false,
      assert: require.resolve('assert'),
    },
  };
  // Needed for create-react-app 5
  updatedConfig.module.rules = [
    ...config.module.rules,
    {
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      use: ['source-map-loader'],
    },
  ];

  // Process is no longer available in create-react-app (Webpack) 5
  updatedConfig.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );

  return updatedConfig;
};
