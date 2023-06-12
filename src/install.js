import { createApp } from 'vue';
import merge from 'deepmerge';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import App from './app/app.vue';
import store from './app/store';
import i18n from './app/locale/i18n';

import globalConfigMixin from './app/mixins/globalConfigMixin';

import './app/assets/icons/sprite';
import './app/css/fonts/_fonts.scss';

import Components from './app/components/utils';
import WebitelUIComponents from './app/webitel-ui/components';

const app = createApp(App)
.use(store)
.use(i18n)
.mixin(globalConfigMixin)
.provide('$eventBus', eventBus);

Object.keys(Components).forEach((name) => {
  app.component(name, Components[name]);
});

Object.keys(WebitelUIComponents).forEach((name) => {
  app.component(name, WebitelUIComponents[name]);
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
    app.mount(selector);
  }

  // eslint-disable-next-line class-methods-use-this
  async setConfig(config) {
    return store.dispatch('SET_CONFIG', config);
  }
}
