<template>
  <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
    <v-flex xs3>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="ml-0" color="primary" dark v-on="on">Dropdown</v-btn>
        </template>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index" @click>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-flex>
    <v-flex xs6>
      <v-text-field label="Search" prepend-inner-icon="search"></v-text-field>
    </v-flex>
    <v-flex xs3>
      <v-layout justify-end>
        <v-btn
          black--text
          round
          color="white"
          :style="btnLoginGoogle"
          class="mr-0"
          @click="loginWithGoogle()"
          >Sign in</v-btn
        >
      </v-layout>
    </v-flex>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      loginBackgroundImage: require('@/assets/images/google-logo.png'),
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
  },
  computed: {
    btnLoginGoogle() {
      return {
        backgroundImage: `url(${this.loginBackgroundImage})`,
        backgroundPosition: `10px center`,
        backgroundSize: `30px`,
        paddingLeft: `50px`
      }
    }
  },
  methods: {
    loginWithGoogle() {
      var api = this.$store.state.hostname + this.$store.state.api.login
      api = this.addParam(api, 'redirect_uri', this.getCurrentPage())
      console.log(api)
      window.location.href = api
    }
  }
}
</script>

<style scoped>
>>> .v-toolbar__content {
  max-width: 1125.9375px;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 100%;
  flex: 1 1 100%;
  margin: auto;
  padding: 24px;
  width: 100%;
}
</style>
