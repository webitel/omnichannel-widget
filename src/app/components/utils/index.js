import Vue from 'vue';
import WtIconBtn from './wt-icon-btn.vue';

const Components = {
  WtIconBtn,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;

