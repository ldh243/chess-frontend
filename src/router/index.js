import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import LoginBox from '@/layouts/Login/LoginBox'
import Instructor from '@/pages/Instructor'
import InfoGmail from '@/pages/Unused/InfoGmail'
import ProfileAdmin from '@/pages/Unused/ProfileAdmin'
import ProfileInstructor from '@/layouts/Instructor/Profile'
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
      path: '/login',
      component: Login,
      children: [
        {
          path: '',
          component: LoginBox
        }
      ]
    },
    {
      path: '/instructor',
      component: Instructor,
      children: [
        {
          path: '',
          component: ProfileInstructor //temporary
        },
        {
          path: 'profile',
          component: ProfileInstructor
        }
      ]
    },
    {
      path: '/profile',
      component: ProfileInstructor
    },
    {
      path: '/infogmail',
      component: InfoGmail
    },
    {
      path: '/profileadmin',
      component: ProfileAdmin
    },
    {
      path: '/profileinstructor',
      component: ProfileInstructor
    }
  ]
})
