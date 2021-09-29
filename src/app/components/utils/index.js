import Vue from 'vue';
import WtButton from './wt-button.vue';
import WtIconBtn from './wt-icon-btn.vue';

const Components = {
  WtButton,
  WtIconBtn,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;
