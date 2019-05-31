<template>
  <v-app>
    <Header />
    <v-content :style="homeBackground">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Header from '@/layouts/Header'

export default {
  components: {
    Header
  },
  data() {
    return {
      backgroundImage: require('@/assets/images/chess-background.jpg')
    }
  },
  computed: {
    homeBackground() {
      return {
        backgroundImage: `url(${this.backgroundImage})`,
        backgroundPosition: `center center`,
        backgroundSize: `cover`,
        filter: `brightness(0.6)`
      }
    }
  }
}
</script>

<style></style>
