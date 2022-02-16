/* eslint-disable */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

process.env.VUE_APP_PACKAGE_VERSION = require('./package.json').version;

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
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
    config.module.rule('js').exclude.add(/\.worker\.js$/);

    config.module
          .rule('fonts')
          .use('url-loader')
          .loader('url-loader')
          .tap((options) => {
            options.limit = false;
            options.fallback = 'file-loader';
            // изменение настроек...
            return options;
          });

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
