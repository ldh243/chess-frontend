<template>
  <v-app>
    <v-content :data-image="backgroundImage" :style="sidebarStyle">
      <Header />
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
