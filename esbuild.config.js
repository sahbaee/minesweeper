const esbuild = require('esbuild');

// browser support list
const browserList = [
  'chrome58',
  'firefox57',
  'opera45',
  'safari11',
];
const DEBUG_MODE = process.env.DEBUG_MODE === 'debug' ? true : false;

// Typescript esbuild config.
const esbuildOptionTypescript = {
  entryPoints: ['./src/script/main.ts'],
  outfile: './dist/script/main.js',
  bundle: true,
  minify: true,
  sourcemap: DEBUG_MODE,
  target: browserList,
  platform: 'browser',
  watch: {
    onRebuild(error, result) {
      if (error) console.error('watch build failed:', error)
      else console.log('watch build succeeded:', result)
    },
  },
};

// Css esbuild config.
const esbuildOptionCss = {
  entryPoints: ['./src/style/style.css'],
  outfile: './dist/style/style.css',
  bundle: true,
  minify: true,
  loader: { '.png': 'dataurl' },
  sourcemap: DEBUG_MODE,
  external: ['*.woff2'],
  // watch mode option
  watch: {
    onRebuild(error, result) {
      if (error) console.error('watch build failed:', error)
      else console.log('watch build succeeded:', result)
    },
  },
};

// Css light color palate esbuild config.
const esbuildOptionCss_light = {
  entryPoints: ['./src/style/colorLight.css'],
  outfile: './dist/style/colorLight.css',
  bundle: true,
  minify: false,
  sourcemap: DEBUG_MODE,
  external: ['*.woff2'],
  // watch mode option
  watch: {
    onRebuild(error, result) {
      if (error) console.error('watch build failed:', error)
      else console.log('watch build succeeded:', result)
    },
  },
};

// start
esbuild.build(esbuildOptionCss_light).then(result => {
  console.log('watching css light theme file...')
})
esbuild.build(esbuildOptionTypescript).then(result => {
  console.log('watching ts -> js...')
});
esbuild.build(esbuildOptionCss).then(result => {
  console.log('watching css...')
});
