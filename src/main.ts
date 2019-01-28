import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import Checkout from './views/Checkout.vue'
import router from './router';
import store from './store';
import './registerServiceWorker';
import './ml.js';

import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
Vue.use(Vuetify)
Vue.use(require('vue-cookies'));

const routes = {
  '/': App,
  '/checkout': Checkout
}

new Vue({
  el: '#app',
  router,
  store,
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
