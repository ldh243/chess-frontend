<template>
  <v-content>
    <InfoGmailBox/>
  </v-content>
</template>

<script>
import InfoGmailBox from '@/layouts/InfoGmailBox'

export default {
  components: {
    InfoGmailBox
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
