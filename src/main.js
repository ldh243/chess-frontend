import Vue from 'vue'
import Index from './pages/Index'
import router from './router'
import store from './store'
import mixin from './mixin'
import './plugins/index'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  mixin,
  render: h => h(Index)
}).$mount('#app')
