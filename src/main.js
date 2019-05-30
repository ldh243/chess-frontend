import Vue from 'vue'
import Index from './pages/Index'
import router from './router/'
import store from './store/'
import './plugins/index'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Index)
}).$mount('#app')
