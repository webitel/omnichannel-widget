import Vue from 'vue';
import merge from 'deepmerge';
import App from './app/app.vue';
import store from './app/store';
import i18n from './app/locale/i18n';

import globalConfigMixin from './app/mixins/globalConfigMixin';

import './app/assets/icons/sprite';
import './app/css/fonts/_fonts.scss';

import './app/components/utils';
import './app/webitel-ui/components';

Vue.config.productionTip = false;

Vue.mixin(globalConfigMixin);

const Instance = new Vue({
  store,
  i18n,
  render: (h) => h(App),
});

const devConfig = {
  _previewMode: false, // [false, 'chat', 'button']
};

const defaultConfig = {
  ...devConfig,
  borderRadiusStyle: 'square', // ['square', 'rounded'],
  lang: 'en', // ['en', 'ru', 'ua'],
  position: 'right', // ['right', 'left', 'static']
  accentColor: 'hsl(42, 100%, 50%)',
  btnOpacity: 1,
  wsUrl: 'wss://dev.webitel.com/chat/ws',
  openTimeout: false, // numeric value in sec
};

export default class WtOmniWidget {
  constructor(selector, _config = {}) {
    const config = merge(defaultConfig, _config);
    this.mountApp({ selector, config });
  }

  async mountApp({ selector, config }) {
    await this.setConfig(config);
    Instance.$mount(selector);
  }

  // eslint-disable-next-line class-methods-use-this
  async setConfig(config) {
    return store.dispatch('SET_CONFIG', config);
  }
}
