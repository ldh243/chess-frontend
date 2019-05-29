<template>
  <v-content class="login-layouts">
    <v-layout row justify-center align-center fill-height>
      <v-flex xs3>
        <v-card class="pb-5" height="600">
          <v-layout column>
            <v-flex xs12 mb-5 py-4 class="login-box-header">
              <v-img class="mb-2" contain height="100" :src="chessLogo" />
              <span class="headline">CHESS BOARD</span>
            </v-flex>
            <v-flex x12>
              <span class="text-truncate black--text display-1">SIGN IN</span>
            </v-flex>
            <v-flex xs6>
              <router-link to="/instructor">
                <v-btn
                  black--text
                  color="white"
                  large
                  class="pl-3 subheading font-weight-medium my-5"
                >
                  <v-img
                    :src="googleLogo"
                    height="35"
                    width="35"
                    contain
                    class="mr-4"
                  />Login with Google
                </v-btn>
              </router-link>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      googleLogo: require('@/assets/images/google-logo.png'),
      chessLogo: require('@/assets/images/chess-logo.png')
    }
  }
}
</script>

<style scoped>
.flex {
  text-align: center;
}
.login-layouts {
  height: 94%;
}
.login-box-header {
  background-color: #eceff1;
}
</style>
