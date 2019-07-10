<template>
  <v-app style="margin-top: -64px">
    <v-layout
      align-end
      justify-center
      row
      fill-height
      xs12
      :style="homeBackground"
    ></v-layout>
    <v-layout
      align-end
      justify-center
      row
      fill-height
      class="introduce-container xs12"
    >
      <v-flex xs12 md9 mb-5>
        <v-container>
          <v-layout row justify-center>
            <v-flex v-for="(item, index) in categoryItem" :key="index" xs4 mx-3>
              <Category :content="item" />
            </v-flex>
            <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ snackbarText }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Đóng
      </v-btn>
    </v-snackbar>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import Category from '@/components/Introduce/Category'
import { setTimeout } from 'timers';
export default {
  components: {
    Category
  },
  data() {
    return {
      backgroundImage: require('@/assets/images/chess-background.jpg'),
      categoryItem: [
        {
          title: 'Học cờ cơ bản',
          imageURL: require('@/assets/images/chess-basic-course.png'),
          url: '/course'
        },
        {
          title: 'Chơi thử',
          imageURL: require('@/assets/images/chess-play.jpg'),
          url: '/play-chess'
        },
        {
          title: 'Trở thành người hướng dẫn',
          imageURL: require('@/assets/images/chess-coach.jpg'),
          url: '/home'
        }
      ],
      snackbar: false,
      color: '',
      mode: '',
      timeout: 6000,
      snackbarText: 'Chúc mừng bạn đã đăng kí tài khoản thành công!'
    }
  },
  computed: {
    homeBackground() {
      return {
        backgroundImage: `url(${this.backgroundImage})`,
        backgroundPosition: `center center`,
        backgroundSize: `cover`,
        filter: `brightness(0.5)`
      }
    }
  },
  created() {
    if (localStorage.getItem('role') == 2) {
      setTimeout(() => {
        this.snackbar = true
      }, 1000)
    }
  }
}
</script>

<style scoped>
.introduce-container {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
}
</style>
