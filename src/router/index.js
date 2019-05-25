import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Instructor from '@/pages/Instructor'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/instructor',
      component: Instructor
    }
  ]
})
