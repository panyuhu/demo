import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { drag } from './dragDirective'

Vue.config.productionTip = false

Vue.directive('drag', drag)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
