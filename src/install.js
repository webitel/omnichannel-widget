import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

const Instance = new Vue({
  store,
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
