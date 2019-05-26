<template>
  <v-app id="sandbox">
    <SideBar />
    <Header />
    <Profile />
    <v-footer :inset="footer.inset" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import SideBar from '@/layouts/SideBar'
import Profile from '@/layouts/Instructor/Profile'
import Header from '@/layouts/Instructor/Header'
export default {
  components: {
    SideBar,
    Profile,
    Header
  },
  data: () => ({
    dark: true,
    drawers: ['Default (no property)', 'Permanent', 'Temporary'],
    footer: {
      inset: false
    }
  })
}
</script>

<style></style>
