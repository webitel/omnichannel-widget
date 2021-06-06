import Vue from 'vue';
import App from './app/app.vue';
import store from './app/store';
import i18n from './app/locale/i18n';

Vue.config.productionTip = false;

const Instance = new Vue({
  store,
  i18n,
  data: () => ({ config: {} }),
  render: (h) => h(App),
});

export default class WtOmniWidget {
  constructor(selector, config) {
    Vue.set(Instance, 'config', {
      ...config,
    });
    Instance.$mount(selector);
    return Instance;
  }
}
