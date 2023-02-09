/* eslint-disable */
process.env.VUE_APP_PACKAGE_VERSION = require('./package.json').version;

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  // devServer: {
  //   https: true,
  // },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/app/css/main.scss";
        `,
      },
    },
  },
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: [
            {
              loader: 'worker-loader',
              options: {
                worker: {
                  type: 'SharedWorker',
                  options: {
                    name: 'wt-omni-widget-shared-worker',
                  },
                },
                inline: 'no-fallback',
              },
            },
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          ],
        },
      ],
    },
  },
  chainWebpack: (config) => {
    config.plugin('polyfills').use(NodePolyfillPlugin);

    config.module.rule('js').exclude.add(/\.worker\.js$/);

    config.module
          .rule('fonts')
          .type('asset/inline')
          .set('generator', {});

    config.module
          .rule('svg')
          .exclude.add(/^(.*sprite).*\.svg/); // same as in svg-sprite-loader

    config.module
          .rule('svg-sprite')
          .test(/^(.*sprite).*\.svg/) // same as in svg-url-loader
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
    .options({
      /*
      https://my.webitel.com/browse/WPRO-621

      Problem: html has a <base> tag: "Specify a default URL and a default target for all links on a page"
      if base tag is declared, svg-sprite-loader writes to already embedded sprites
      (client svg sprites -- which are already declared when we are loading wt-omni-widget)
      usages this base: (<use xlink:href="#location"></use> -> <use xlink:href="https:/base.url/#location"></use>)
      which brakes these icons.

      Solution: change svg-sprite-loader config to prevent writing base to icon usage

      https://stackoverflow.com/questions/18259032/using-base-tag-on-a-page-that-contains-svg-marker-elements-fails-to-render-marke
      https://www.npmjs.com/package/svg-sprite-loader#sprite-module
      https://github.com/JetBrains/svg-sprite-loader/issues/116
      https://github.com/JetBrains/svg-mixer/blob/v1/packages/svg-baker-runtime/src/browser-sprite.js#L41
       */
      spriteModule: './spriteModuleConfig.js',
    });
  },
};
