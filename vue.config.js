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
};
