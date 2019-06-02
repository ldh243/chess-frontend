import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hostname: 'http://chess-env.zgqmvp9n3m.ap-southeast-1.elasticbeanstalk.com',
    api: {
      login: '/oauth2/authorize/google',
      getCurrentUserDetail: '/user/get-current-user-detail'
    }
  }
})
