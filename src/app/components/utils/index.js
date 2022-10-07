import Vue from 'vue';
import WtButton from './wt-button.vue';
import WtIconBtn from './wt-icon-btn.vue';
import WtInput from './wt-input.vue';
import WtLabel from './wt-label.vue';

const Components = {
  WtButton,
  WtIconBtn,
  WtInput,
  WtLabel,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;
