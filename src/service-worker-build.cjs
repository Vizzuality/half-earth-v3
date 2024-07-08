const workboxBuild = require('workbox-build');

const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    swSrc: 'src/service-worker-template.js',
    swDest: 'build/custom-service-worker.js',
    globDirectory: 'build',
    globIgnores: ['./custom-service-worker.js', 'node_modules/**/*'],
    globPatterns: [
      '**/*.{js,css,html,svg}',
    ],
    // Increase the limit to 4mb:
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
  });
};

buildSW();
