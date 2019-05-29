<template>
  <v-app id="sandbox">
    <SideBar />
    <Header />
    <DashboardContent />
    <Footer />
  </v-app>
</template>
<script>
import SideBar from '@/layouts/SideBar'
import DashboardContent from '@/layouts/DashboardContent'
import Footer from '@/layouts/Footer'
import Header from '@/layouts/Dashboard/Header'
export default {
  components: {
    SideBar,
    DashboardContent,
    Footer,
    Header
  }
}
</script>

<style></style>
