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
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import Category from '@/components/Introduce/Category'
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
      ]
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
