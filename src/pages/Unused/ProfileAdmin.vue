<template>
  <v-content>
    <Drawer />
    <ProfileAdminBox />
    <v-footer :inset="footer.inset" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-content>
</template>

<script>
import ProfileAdminBox from '@/layouts/Unused/ProfileAdminBox'
import Drawer from '@/layouts/Drawer'

export default {
  components: {
    Drawer,
    ProfileAdminBox
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
