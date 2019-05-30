<template>
  <v-content>
    <SideBar />
    <ProfileInstructorBox />
    <v-footer :inset="footer.inset" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-content>
</template>

<script>
import Drawer from '@/layouts/Drawer'
import ProfileInstructorBox from '@/layouts/Unused/ProfileInstructorBox'

export default {
  components: {
    Drawer,
    ProfileInstructorBox
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
