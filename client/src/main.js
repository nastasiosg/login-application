import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import Axios from 'axios';

import './style/main.css';

Vue.config.productionTip = false

// Set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
