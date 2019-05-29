<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
    <Footer />
  </transition>
</template>
<script>
import Footer from '@/layouts/Footer'
export default {
  components: {
    Footer
  }
}
</script>

<style></style>
