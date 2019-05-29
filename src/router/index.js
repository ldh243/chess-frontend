import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import LoginBox from '@/layouts/Login/LoginBox'
import Dashboard from '@/pages/DashboardLayout'
import InfoGmail from '@/pages/Unused/InfoGmail'
import ProfileAdmin from '@/pages/Unused/ProfileAdmin'
import Profile from '@/layouts/Dashboard/Profile'
import Statistics from '@/layouts/Dashboard/Statistics'
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
      path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: 'profile',
          component: Profile
        },
        {
          path: 'statistics',
          component: Statistics
        }
      ]
    },
    {
      path: '/infogmail',
      component: InfoGmail
    },
    {
      path: '/profileadmin',
      component: ProfileAdmin
    }
  ]
})
