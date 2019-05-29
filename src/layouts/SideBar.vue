<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    hide-overlay
    stateless
    orverflow
    app
    fixed
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile>
          <v-list-tile-content class="title-header-parent">
            <v-list-tile-title class="title-header">COLS</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0" two-line subheader>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img
              src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
            />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
            <v-list-tile-sub-title>Instructor</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile v-for="item in items" :key="item.title" :to="item.path">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Thống kê', icon: 'mdi-view-dashboard', path: '/profile2' },
        {
          title: 'Khóa học',
          icon: 'mdi-file-document-box-outline',
          path: '/profile2'
        },
        { title: 'User', icon: 'mdi-account', path: '/profile' }
      ],
      mini: true,
      right: false
    }
  }
}
</script>

<style>
.title-header {
  text-align: center !important;
}
.title-header-parent {
  opacity: 1 !important;
}
</style>
