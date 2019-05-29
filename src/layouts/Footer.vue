<template>
  <v-footer :inset="footer.inset" app>
    <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      dark: true,
      drawers: ['Default (no property)', 'Permanent', 'Temporary'],
      footer: {
        inset: false
      }
    }
  }
}
</script>

<style></style>
