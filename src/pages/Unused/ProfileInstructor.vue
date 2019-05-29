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
import SideBar from '@/layouts/SideBar'
import ProfileInstructorBox from '@/layouts/Unused/ProfileInstructorBox'

export default {
  components: {
    SideBar,
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
