import Vue from 'vue';
import App from './app/app.vue';
import store from './app/store';
import i18n from './app/locale/i18n';

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

const myConfig = {
  borderRadiusStyle: 'rounded', // ['square', 'rounded'],
  lang: 'ua', // ['en', 'ru', 'ua'],
  position: {
    bottom: 100,
    right: 100,
  },
  accentColor: 'hsl(32, 100%, 50%)',
  btnOpacity: 0.9,
  baseUrl: 'wss://dev.webitel.com/chat/ws',
};

export default class WtOmniWidget {
  constructor(selector, config) {
    config = myConfig;
    Vue.prototype.$config = config;
    Instance.$mount(selector);
    return Instance;
  }
}
