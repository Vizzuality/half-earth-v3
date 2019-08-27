const workboxBuild = require('workbox-build');

// config options here:
// https://developers.google.com/web/tools/workbox/modules/workbox-build
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    swSrc: 'src/service-worker-template.js',
    swDest: 'build/custom-service-worker.js',
    globDirectory: 'build',
    globIgnores: ['./custom-service-worker.js', 'node_modules/**/*'],
    globPatterns: [
      '**/*.{js,css,html}',
    ],
    // Increase the limit to 4mb:
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
  }).then(({count, size, warnings}) => {
    // Optionally, log any warnings and details.
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  });
}

buildSW();