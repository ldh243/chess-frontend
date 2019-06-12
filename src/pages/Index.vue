<template>
  <v-app>
    <Header/>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer/>
  </v-app>
</template>


<script>
import Header from '@/layouts/Header'
import Footer from '@/layouts/Footer'
export default {
  components: {
    Header,
    Footer
  },
  created() {
    //get token from URL
    this.getTokenAndSave()

    //check from localStorage
    if (this.getToken()) {
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
    getTokenAndSave() {
      var url = new URL(window.location.href)
      var token = url.searchParams.get('token')

      if (token) {
        var originUri = url.origin + url.pathname
        history.pushState(null, '', originUri)
        localStorage.setItem('access-token', token)
      }
    }
  }
}
</script>
<style></style>
