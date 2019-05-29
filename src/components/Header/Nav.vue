<template>
  <v-toolbar flat height="50" color="#EEEEEE" class="text-xs-center">
    <v-btn id="menu-btn" color="orange darken-3" flat :ripple="false">
      <v-icon dark left>mdi-menu</v-icon>DANH MỤC
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Link One</v-btn>
      <v-btn flat>Link Two</v-btn>
      <v-btn flat>Link Three</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {}
</script>

<style scoped>
#menu-btn::before {
  color: transparent;
}
#menu-btn {
  font-weight: bold;
}
</style>
