import Vue from 'vue'
import Index from './pages/Index'
import router from './router'
import store from './store'
import mixin from './mixin'
import './plugins/index'
Vue.config.productionTip = false

function getParamsFromHeader(to) {
  const token = to.query.token
  const role = to.query.role
  if (token && role) {
    localStorage.setItem('access-token', `Chess ${token}`)
    localStorage.setItem('role', role)
  }
}

router.beforeEach((to, from, next) => {
  getParamsFromHeader(to)
  if (Object.entries(to.query).length && to.query.constructor === Object) {
    return next(to.path)
  }
  next()
})

new Vue({
  router,
  store,
  mixin,
  render: h => h(Index)
}).$mount('#app')
