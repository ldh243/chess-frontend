<template>
  <v-app>
    <Header/>
    <v-content>
      <InfoCourse/>
      <v-footer :inset="footer.inset" app>
        <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
import Header from '@/layouts/Header'
import InfoCourse from '@/components/ProfileCourse/InfoCourse'

export default {
  components: {
    Header,
    InfoCourse
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
