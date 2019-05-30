<template>
  <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
    <v-text-field label="Search" prepend-inner-icon="search"></v-text-field>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-badge color="#E53935" overlap>
            <template v-slot:badge>
              <span>12</span>
            </template>
            <v-icon>notifications</v-icon>
          </v-badge>
        </template>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-btn>
    <div class="text-xs-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">
            <v-badge color="#E53935" overlap>
              <template v-slot:badge>
                <span>12</span>
              </template>
              <v-icon>notifications</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index" @click>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
    <v-menu bottom left>
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on">
          <v-icon color="black">notifications</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" @click>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
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
      },
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
    }
  }
}
</script>

<style scoped>
>>> .v-badge__badge {
  height: 24px;
  width: 24px;
  font-size: 12px;
}
>>> .v-badge--overlap .v-badge__badge {
  top: -10px;
  right: -10px;
}
</style>
