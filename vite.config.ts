import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, transformWithEsbuild } from 'vite';
import svgr from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
// Custom Vite plugin for directory-named resolution
function directoryNamedResolver() {
  return {
    name: 'vite-plugin-directory-named-resolver',
    async resolveId(source, importer) {
      if (importer && (source.startsWith('.') || source.startsWith('/'))) {
        const dirname = path.dirname(importer);
        const basename = path.basename(source);
        const potentialFilePath = path.resolve(
          dirname,
          source,
          `${basename}.js`
        );

        // Attempt to resolve the file
        const resolved = await this.resolve(potentialFilePath, importer, {
          skipSelf: true,
        });
        if (resolved) {
          return resolved.id;
        }
      }
      return null;
    },
  };
}

function moduleScssResolver() {
  return {
    name: 'vite-plugin-module-scss-resolver',
    resolveId(source, importer) {
      // Check if the import path ends with .module
      if (source.endsWith('.module')) {
        const resolvedPath = `${source}.scss`;
        // Resolve the path to the actual file
        return this.resolve(resolvedPath, importer, { skipSelf: true }).then(
          (resolved) => {
            if (resolved) {
              return resolved.id;
            }
            return null;
          }
        );
      }
      return null;
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.(js|ts)$/)) return null;

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        });
      },
    },
    react(),
    viteTsconfigPaths(),
    directoryNamedResolver(),
    moduleScssResolver(),
    svgr(),
  ],
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
      },
    },
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
     },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/styles'),
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
      store: path.resolve(__dirname, 'src/store'),
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
  },
});
