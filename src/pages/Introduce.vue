<template>
  <v-app>
    <v-content>
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
        <v-flex xs3></v-flex>
        <v-flex v-for="(item, index) in categoryItem" :key="index" xs3 mb-5>
          <Category :content="item" />
        </v-flex>
        <v-flex xs3></v-flex>
      </v-layout>
    </v-content>
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
          url: '/learn-chess'
        },
        {
          title: 'Chơi thử',
          imageURL: require('@/assets/images/chess-play.jpg'),
          url: '/home'
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
