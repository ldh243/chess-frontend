<template>
  <v-app>
    <Header/>
    <v-content>
      <EnrolHeader/>

      <v-footer :inset="footer.inset" app>
        <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
import Header from '@/layouts/Header'
import EnrolHeader from '@/components/EnrolCourse/EnrolHeader'

export default {
  components: {
    Header,
    EnrolHeader
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

<style>
#h1 {
  width: 100%;
}
</style>
