import Vue from 'vue'
const axios = require('axios')
export default Vue.mixin({
  methods: {
    addParam(url, name, value) {
      if (url.includes('?')) {
        return url + '&' + name + '=' + value
      } else {
        return url + '?' + name + '=' + value
      }
    },

    async callAxios(method, url, data) {
      //get token from localStorage
      var token = this.getToken()

      //set config for axios
      let config = {
        method: method,
        url: url,
        data: data,
        headers: {
          Authorization: 'Chess ' + token
        }
      }
      return await axios(config)
    },

    getCurrentPage() {
      return window.location.href
    },

    getToken() {
      return localStorage.getItem('access-token')
    }
  }
})
