import Vue from 'vue'
import Router from 'vue-router'
// page
import Home from '@/pages/Home'
import Dashboard from '@/pages/DashboardLayout'
import InfoGmail from '@/pages/Unused/InfoGmail'
import Introduce from '@/pages/Introduce'
import LearnChess from '@/pages/LearnChess'
import ProfileAdmin from '@/pages/Unused/ProfileAdmin'

//layout
import LoginBox from '@/layouts/Login/LoginBox'
import Profile from '@/layouts/Dashboard/Profile'
import Statistics from '@/layouts/Dashboard/Statistics'
import Courses from '@/layouts/Dashboard/Courses'
import UserManagement from '@/layouts/Dashboard/UserManagement'
import ProfileUser from '@/components/Users/ProfileUser'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Introduce
    },
    {
      path: '/login',
      component: Home,
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
        },
        {
          path: 'courses',
          component: Courses
        },
        {
          path: 'accounts',
          component: UserManagement
        }
      ]
    },
    {
      path: '/learn-chess',
      component: LearnChess
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
      path: '/profileuser',
      component: ProfileUser
    }
  ]
})
