import Vue from 'vue';
import WtIcon from './wt-icon/wt-icon.vue';

const Components = {
  WtIcon,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;

