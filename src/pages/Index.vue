<template>
  <v-app>
    <Header />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/layouts/Header'
import Footer from '@/layouts/Footer'
export default {
  components: {
    Header,
    Footer
  }
}
</script>
<style></style>
