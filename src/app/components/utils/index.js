import Vue from 'vue';
import WtButton from './wt-button.vue';
import WtIconBtn from './wt-icon-btn.vue';
import WtInput from './wt-input.vue';
import WtLabel from './wt-label.vue';
import WtTextarea from './wt-textarea.vue';
import WtSnackBar from './wt-snack-bar.vue';

const Components = {
  WtButton,
  WtIconBtn,
  WtInput,
  WtLabel,
  WtTextarea,
  WtSnackBar,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;
