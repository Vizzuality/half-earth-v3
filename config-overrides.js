const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
// Hot reload without eject
// docs on: https://github.com/cdharris/react-app-rewire-hot-loader
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

module.exports = function override(config, env) {
  config.resolve = {
    extensions: ['.js', '.jsx', '.scss'],
    plugins: [ new DirectoryNamedWebpackPlugin() ],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      scenes: path.resolve(__dirname, 'src/scenes'),
      layouts: path.resolve(__dirname, 'src/layouts'),
      pages: path.resolve(__dirname, 'src/pages'),
      icons: path.resolve(__dirname, 'src/assets/icons'),
      logos: path.resolve(__dirname, 'src/assets/logos'),
      styles: path.resolve(__dirname, 'src/styles'),
      router: path.resolve(__dirname, 'src/router'),
      selectors: path.resolve(__dirname, 'src/selectors'),
      sideEffects: path.resolve(__dirname, 'src/side-effects'),
      actions: path.resolve(__dirname, 'src/actions'),
      utils: path.resolve(__dirname, 'src/utils'),
      constants: path.resolve(__dirname, 'src/constants'),
      redux_modules: path.resolve(__dirname, 'src/redux-modules'),
      services: path.resolve(__dirname, 'src/services'),
      reducerRegistry: path.resolve(__dirname, 'src/reducerRegistry'),
      sagaRegistry: path.resolve(__dirname, 'src/sagaRegistry'),
      sceneConfigs: path.resolve(__dirname, 'src/sceneConfigs'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      images: path.resolve(__dirname, 'src/assets/images'),
      providers: path.resolve(__dirname, 'src/providers')
    }
  }
  config = rewireReactHotLoader(config, env);
  return config;
}