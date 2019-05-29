<template>
  <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
    <v-text-field label="Search" prepend-inner-icon="search"></v-text-field>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      primaryDrawer: {
        model: null,
        type: 'default (no property)',
        clipped: false,
        floating: false,
        mini: false
      }
    }
  }
}
</script>

<style></style>
