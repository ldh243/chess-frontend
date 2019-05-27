<template>
  <v-content :data-image="backgroundImage" :style="sidebarStyle">
    <Header/>
    <RegisterBox/>
  </v-content>
</template>

<script>
import RegisterBox from '@/layouts/RegisterBox'
import Header from '@/layouts/Header'

export default {
  components: {
    RegisterBox,
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
