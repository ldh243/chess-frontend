import Vue from 'vue'
import Index from './pages/Index'
import router from './router'
import store from './store'
import mixin from './mixin'
import './plugins/index'
import firebase from 'firebase'
// import './assets/style/vue-chessboard.css'
Vue.config.productionTip = false

//connect firebase
var firebaseConfig = {
  apiKey: 'AIzaSyDBz72G-L_nG1s2CgXHx0pPKc8tQLNyyS0',
  authDomain: 'cols-fpt.firebaseapp.com',
  databaseURL: 'https://cols-fpt.firebaseio.com',
  projectId: 'cols-fpt',
  storageBucket: 'cols-fpt.appspot.com',
  messagingSenderId: '1082474123206',
  appId: '1:1082474123206:web:79a9804e9ccc5382'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

function getParamsFromHeader(to) {
  const token = to.query.token
  const role = to.query.role
  const acceptedRole = [2, 4]
  if (token && role && acceptedRole.includes(parseInt(role))) {
    localStorage.setItem('access-token', `Chess ${token}`)
    localStorage.setItem('role', role)
  }
}

router.beforeEach((to, from, next) => {
  getParamsFromHeader(to)
  const role = localStorage.getItem('role')
  if (role == 4 && to.path !== '/register') {
    return next('/register')
  }
  if (role == 2 && from.path === '/register') {
    store.state.user = JSON.parse(localStorage.getItem('user'))
  }
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
