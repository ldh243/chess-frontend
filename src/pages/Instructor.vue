<template>
  <v-app id="sandbox">
    <SideBar />
    <Header />
    <DashboardContent />
  </v-app>
</template>

<script>
import SideBar from '@/layouts/SideBar'
import DashboardContent from '@/layouts/DashboardContent'
import Header from '@/layouts/Instructor/Header'

export default {
  components: {
    SideBar,
    DashboardContent,
    Header
  }
}
</script>

<style></style>
