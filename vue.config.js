/* eslint-disable */
process.env.VUE_APP_PACKAGE_VERSION = require('./package.json').version;

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    https: true,
  },
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
          .loader('svg-sprite-loader');
  },
};
