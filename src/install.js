import Vue from 'vue';
import merge from 'deepmerge';
import PortalVue from 'portal-vue';
import VueFlicking from '@egjs/vue-flicking';
import App from './app/app.vue';
import store from './app/store';
import i18n from './app/locale/i18n';
import '@egjs/vue-flicking/dist/flicking.css';
import '@egjs/vue-flicking/dist/flicking-inline.css';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';

import globalConfigMixin from './app/mixins/globalConfigMixin';

import './app/assets/icons/sprite';
import './app/css/fonts/_fonts.scss';

import './app/components/utils';
import './app/webitel-ui/components';

Vue.config.productionTip = false;

Vue.use(PortalVue, VueFlicking);
Vue.mixin(globalConfigMixin);
Vue.prototype.$eventBus = eventBus;

const Instance = new Vue({
  store,
  i18n,
  render: (h) => h(App),
});

const devConfig = {
  view: {
    _previewMode: false, // [false, 'chat', 'button']
  },
};

const defaultConfig = merge(devConfig, {
  view: {
    borderRadiusStyle: 'square', // ['square', 'rounded'],
    lang: 'en', // ['en', 'ru', 'ua'],
    position: 'right', // ['right', 'left', 'static']
    accentColor: 'hsl(42, 100%, 50%)',
    btnOpacity: 1,
  },
  chat: null,
  appointment: null,
  alternativeChannels: null,
});

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
