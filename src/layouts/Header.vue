<template>
  <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute class="bg-dark">
    <v-flex xs1>
      <router-link to="/">
        <v-layout justify-center align-center fill-height>
          <img :src="chessLogo" />
          <span class="white--text text-logo ml-2">COLS</span>
        </v-layout>
      </router-link>
    </v-flex>
    <v-flex xs3 ml-3>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="ml-0" color="primary" dark v-on="on">Học</v-btn>
        </template>
        <v-list>
          <v-list-tile
            v-for="(item, index) in learnMenu"
            :key="index"
            :to="item.href"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex v-if="user == null" xs3 offset-xs6>
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
    <v-flex v-else xs3 offset-xs6>
      <v-layout justify-end>
        <v-menu offset-y transition="slide-y-transition" bottom left>
          <template v-slot:activator="{ on }">
            <a v-on="on">
              <v-layout justify-center align-center fill-height>
                <v-avatar :size="40">
                  <img :src="user.avatar" />
                </v-avatar>
                <span class="white--text ml-2">{{ user.fullName }}</span>
              </v-layout>
            </a>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in userMenu"
              :key="index"
              :to="item.href"
            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-layout>
    </v-flex>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      chessLogo: require('@/assets/images/chess.png'),
      loginBackgroundImage: require('@/assets/images/google-logo.png'),
      primaryDrawer: {
        model: null,
        type: 'default (no property)',
        clipped: false,
        floating: false,
        mini: false
      },
      learnMenu: [
        { title: 'Học lý thuyết', href: '/learning' },
        { title: 'Học thế cờ', href: '/learning-board' }
      ],
      user: this.$store.state.user,
      loader: 0,
      userMenu: [
        { title: 'Thông tin cá nhân', href: '/profile' },
        { title: 'Đăng xuất', href: '' }
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
  mounted() {
    if (localStorage.getItem('access-token') != null) {
      this.loader++
      let method = 'GET'
      let url = this.$store.state.api.getCurrentUserDetail
      this.callAxios(method, url).then(result => {
        let obj = result.data.data
        obj.roleName = this.getRoleName(obj.roleId)
        obj.status = this.getStatusUser(obj.active)
        this.user = obj
        this.$store.commit('changeUser', obj)
        let data = JSON.stringify(obj)
        localStorage.setItem('user', data)
        localStorage.removeItem('role')
        this.loader--
      })
    } else {
      this.$store.commit('changeUser', null)
    }
  },
  methods: {
    loginWithGoogle() {
      var api = this.$store.state.api.login
      api = this.addParam(api, 'redirect_uri', this.getCurrentPage())
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
.text-logo {
  font-weight: bold;
  font-size: 16px;
}
img {
  width: 40px;
  height: 40px;
}
>>> .btn-profile {
  height: 40px !important;
}
</style>
