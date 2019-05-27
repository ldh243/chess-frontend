<template>
  <v-content class="login-layouts">
    <v-layout row justify-center align-center fill-height>
      <v-flex xs3>
        <v-card class="py-5" height="650" width="400">
          <v-layout column>
            <v-flex xs12 mb-5>
              <v-img contain height="200" :src="chessLogo"></v-img>
            </v-flex>
            <v-flex x12>
              <span class="text-truncate black--text display-1">
                <h3>Đăng Nhập</h3>
              </span>
            </v-flex>
            <v-flex xs6>
              <v-btn
                black--text
                color="white"
                large
                class="pl-3 subheading font-weight-medium my-5"
              >
                <v-img :src="googleLogo" height="35" width="35" contain class="mr-4"/>Đăng Nhập với tài khoản Google
              </v-btn>
            </v-flex>
          </v-layout>
          <a href="/register">
            <h3>Bấm để đăng ký ngay</h3>
          </a>
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
      chessLogo: require('@/assets/images/chess-logo.jpg')
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
</style>
