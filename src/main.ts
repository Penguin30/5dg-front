import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './ml.js';

import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
Vue.use(Vuetify)
Vue.use(require('vue-cookies'));

new Vue({

    router,
    store,
    render: h => h(App)
}).$mount('#app');
