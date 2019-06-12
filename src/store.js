import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: {
      login: 'http://cols-be.ml/oauth2/authorize/google',
      getCurrentUserDetail: '/user/get-current-user-detail',
      getCurrentUserDetail: 'http://cols-be.ml/user/get-current-user-detail',

      //course
      getCoursesPagination: 'http://cols-be.ml/course/get-course-pagination'
    },
    role: {
      instructor: '1',
      learner: '2',
      admin: '3',
      registrator: '4'
    },
    user: JSON.parse(localStorage.getItem('user'))
  },
  mutations: {
    changeUser(state, payload) {
      state.user = payload
    }
  },
  actions: {}
})
