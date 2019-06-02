import Vue from 'vue'
const axios = require('axios')
Vue.mixin({
  methods: {
    addParam(url, name, value) {
      if (url.includes('?')) {
        return url + '&' + name + '=' + value
      } else {
        return url + '?' + name + '=' + value
      }
    },

    async callAxios(method, url) {
      //get token from localStorage
      var token = localStorage.getItem('access-token')

      //set config for axios
      let config = {
        method: method,
        url: url,
        headers: {
          Authorization: 'Chess ' + token
        }
      }
      return await axios(config)
    },

    getCurrentPage() {
      return window.location.href
    }
  }
})
