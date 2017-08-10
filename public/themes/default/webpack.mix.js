let mix = require('laravel-mix').mix;
let webpack = require('webpack');

mix.setPublicPath('dist');

// get font-awesome
mix.copyDirectory('node_modules/font-awesome/fonts', 'dist/fonts');
mix.copyDirectory('node_modules/font-awesome/scss', 'src/scss/font-awesome');

mix.sass('src/scss/main.scss', 'dist/css/main.css').options({
  processCssUrls: false
});

mix.js('src/js/main.js', 'dist/js/main.js');

mix.webpackConfig({
  devtool: 'sourcemap',
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      '_': 'underscore'
    })
  ]
});