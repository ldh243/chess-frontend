<template>
  <v-app id="sandbox">
    <Drawer />
    <Header />
    <DashboardContent />
    <Footer />
  </v-app>
</template>
<script>
import Drawer from '@/layouts/Drawer'
import DashboardContent from '@/layouts/DashboardContent'
import Footer from '@/layouts/Footer'
import Header from '@/layouts/Dashboard/Header'
export default {
  components: {
    Drawer,
    DashboardContent,
    Footer,
    Header
  }
}
</script>

<style></style>
