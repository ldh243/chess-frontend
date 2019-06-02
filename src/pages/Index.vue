<template>
  <router-view></router-view>
</template>

<style></style>

<script>
export default {
  created() {
    //get token from URL
    this.getToken()

    //check from localStorage
    if (this.checkToken()) {
      //token exist
      var api =
        this.$store.state.hostname + this.$store.state.api.getCurrentUserDetail

      this.callAxios('GET', api)
        .then(result => {
          console.log(result)
        })
        .catch(error => console.error(error))
    } else {
      //token isn't exist
    }
  },
  methods: {
    getToken() {
      var url = window.location.href
      if (url.includes('token=')) {
        var index = url.search('token=')
        var token = url.substr(34 + 6)
        var originUri = url.substr(0, index - 1)
        history.pushState(null, '', originUri)
        localStorage.setItem('access-token', token)
      }
    },
    checkToken() {
      if (localStorage.getItem('access-token')) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style></style>
