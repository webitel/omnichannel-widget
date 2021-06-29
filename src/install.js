import Vue from 'vue';
import merge from 'deepmerge';
import App from './app/app.vue';
import store from './app/store';
import i18n from './app/locale/i18n';
import workerController from './app/workers/websocket-shared-worker/install';

import './app/assets/img/svg-sprites/wt-icon.svg';
import './app/css/fonts/_fonts.scss';

import './app/components/utils';
import './app/webitel-ui/components';

Vue.config.productionTip = false;

const Instance = new Vue({
  store,
  i18n,
  render: (h) => h(App),
});

const defaultConfig = {
  borderRadiusStyle: 'square', // ['square', 'rounded'],
  lang: 'en', // ['en', 'ru', 'ua'],
  position: {
    bottom: 100,
    right: 100,
  },
  accentColor: 'hsl(42, 100%, 50%)',
  btnOpacity: 1,
  baseUrl: 'wss://dev.webitel.com/chat/ws',
};

export default class WtOmniWidget {
  constructor(selector, _config = {}) {
    const config = merge(defaultConfig, _config);
    workerController.openWebSocket(config.baseUrl);
    Vue.prototype.$config = config;
    Instance.$mount(selector);
    return Instance;
  }
}
