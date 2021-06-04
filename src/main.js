import Vue from 'vue';
import WtOmniWidget from './install';
import './css/_main.scss';

// install workers
// import './workers/websocket-shared-worker/install';

Vue.config.productionTip = false;

export default new WtOmniWidget('#app', {});
