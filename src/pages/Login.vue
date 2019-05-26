<template>
  <v-app>
    <v-content :data-image="backgroundImage" :style="sidebarStyle">
      <Header />
      <LoginBox />
    </v-content>
  </v-app>
</template>

<script>
import LoginBox from '@/layouts/Login/LoginBox'
import Header from '@/layouts/Login/Header'
export default {
  components: {
    LoginBox,
    Header
  },
  data() {
    return {
      backgroundImage: require('@/assets/images/chess-background.jpg')
    }
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`,
        backgroundPosition: `center center`,
        backgroundSize: `cover`
      }
    }
  }
}
</script>
<style></style>
