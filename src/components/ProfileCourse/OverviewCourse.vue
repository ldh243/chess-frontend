<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-layout>
        <v-flex>
          <v-btn @click="showBlock(1)" id="h2" color="white" round large>Tổng quan</v-btn>

          <v-btn @click="showBlock(2)" id="h2" color="white" round large>Nội dung</v-btn>

          <v-btn @click="showBlock(3)" id="h2" color="white" round large>Đánh giá</v-btn>
        </v-flex>
      </v-layout>
      <div class="overview" v-if="show == 1">
        <v-card>
          <div class="d-flex justify-between align-center mb-3">
            <v-btn @click="all">Xem tất cả</v-btn>
            <v-btn @click="none">Đóng</v-btn>
          </div>
          <div>
            <v-expansion-panel>
              <h2>Tác giả: {{author}}</h2>
            </v-expansion-panel>
          </div>
          <v-expansion-panel v-model="panel" expand>
            <v-expansion-panel-content v-for="(item,i) in items" :key="i">
              <template v-slot:header>
                <div>{{item.title}}</div>
              </template>
              <v-card>
                <v-card-text>{{item.info}}.</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card>
      </div>
      <div class="intent" v-else-if="show == 2">
        <IntentCourse/>
      </div>
      <div class="comments" v-else>
        <Comment/>
      </div>
    </v-container>
  </div>
</template>

<script>
import IntentCourse from '@/components/ProfileCourse/IntentCourse'
import Comment from '@/components/ProfileCourse/Comment'
export default {
  components: {
    IntentCourse,
    Comment
  },
  data() {
    return {
      show: 1,
      panel: [],

      author: 'Lê Quang Liêm',
      items: [
        {
          title: 'Lợi ích khóa học',
          info: 'Hiểu được cách đánh cờ, phá thế'
        },
        {
          title: 'Thích hợp với',
          info: 'Trẻ em'
        }
      ]
    }
  },
  methods: {
    // Create an array the length of our items
    // with all values as true
    all() {
      this.panel = [...Array(this.items).keys()].map(_ => true)
    },
    // Reset the panel
    none() {
      this.panel = []
    },
    showBlock(number) {
      this.show = number
    }
  }
}
</script>

<style>
</style>
