import Vue from 'vue'
import App from './App.vue'
import store from "./store/store"
import router from './router/router'


import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  store,
  vuetify,
  router
}).$mount('#app')

