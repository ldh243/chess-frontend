<template>
  <v-content>
    <SideBar/>
    <ProfileAdminBox/>
    <v-footer :inset="footer.inset" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-content>
</template>

<script>
import ProfileAdminBox from '@/layouts/ProfileAdminBox'
import Footer from '@/layouts/Footer'
import SideBar from '@/layouts/SideBar'

export default {
  components: {
    SideBar,
    ProfileAdminBox,
    Footer
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
