/* eslint-disable */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
                inline: 'fallback',
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

    config
      .plugin('copy-webpack-plugin')
      .use(CopyWebpackPlugin, [{
        patterns:
          [{
            from: 'src/app/assets/img/svg-sprites/wt-icon.svg',
            to: 'img/svg-sprites',
          }],
      },
      ]);

    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();

    svgRule
      .test(/\.svg/)
      .exclude
      .add(path.resolve(__dirname, 'src/app/assets/img/svg-sprites/wt-icon.svg'))
      .end()
      .use('svg-url-loader')
      .loader('svg-url-loader');

    config.module
      .rule('svg-sprite')
      .test(/^(.*sprites).*\.svg/)
      // .test(/\.svg/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: () => '' });
  },
};
