import Vue from 'vue'
import Router from 'vue-router'

//pages
import Introduce from '@/pages/Introduce'
import CourseOverview from '@/pages/CourseOverview'
import PlayChess from '@/pages/PlayChess'
import Profile from '@/pages/Profile'
import LearningBoard from '@/pages/LearningBoard'
import LearningProgress from '@/pages/LearningProgress'
import LearningTheory from '@/pages/LearningTheory'
import CourseDetail from '@/pages/CourseDetail'
import Register from '@/pages/Register'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Introduce },
    { path: '/profile', component: Profile },
    { path: '/course', component: CourseOverview },
    { path: '/play-chess', component: PlayChess },
    { path: '/learning', component: LearningProgress },
    { path: '/learning-board', component: LearningBoard },
    { path: '/learning-theory', component: LearningTheory },
    { path: '/course/:courseId', component: CourseDetail },
    { path: '/register', component: Register }
    // {
    //   path: '/login',
    //   component: Home,
    //   children: [
    //     {
    //       path: '',
    //       component: LoginBox
    //     }
    //   ]
    // },
    //
    // {
    //   path: '/infogmail',
    //   component: InfoGmail
    // },
    // {
    //   path: '/profileadmin',
    //   component: ProfileAdmin
    // },
    // {
    //   path: '/profilecourse',
    //   component: ProfileCourse
    // },
    // {
    //   path: '/enrolcourse',
    //   component: EnrolCourse
    // },
    // {
    //   path: '/learningvideo',
    //   component: LearningByvideo
    // },
    // {
    //   path: '/learningchessboard',
    //   component: LearningBychessboard
    // }
  ]
})
