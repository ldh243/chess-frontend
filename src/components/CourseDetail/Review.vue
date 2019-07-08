<template>
  <v-card>
    <Loader v-if="loader" />
    <v-card-title primary-title>
      <div class="headline">Đánh giá</div>
    </v-card-title>
    <v-layout row py-3>
      <v-flex xs4 v-if="courseOverview.medRating != null">
        <v-layout row wrap>
          <v-flex xs12 class="text-xs-center">
            <span class="display-3 font-weight-bold">{{courseOverview.medRating}}</span>
            <v-rating
              v-model="courseOverview.medRating"
              :empty-icon="emptyIcon"
              :full-icon="fullIcon"
              :half-icon="halfIcon"
              :half-increments="true"
              background-color="grey lighten-1"
              color="yellow darken-3"
              readonly
            ></v-rating>
            <span>({{courseOverview.totalQuantityRatings}} người đã đánh giá)</span>
          </v-flex>
          <v-flex x12 class="text-xs-center">
            <v-layout row mt-3 wrap>
              <v-flex xs12 v-for="(item, index) in courseOverview.listRatings" :key="index">
                <v-layout>
                  <v-flex xs3 mr-2>
                    <v-layout fill-height align-center justify-end>
                      <span class="mr-1">{{index + 1}}</span>
                      <v-icon color="yellow darken-3" size="12">fa-star</v-icon>
                    </v-layout>
                  </v-flex>
                  <v-flex xs6 mr-2>
                    <v-layout fill-height align-center>
                      <v-progress-linear v-model="item.ratio" color="yellow darken-3"></v-progress-linear>
                    </v-layout>
                  </v-flex>
                  <v-flex xs3>
                    <v-layout fill-height align-center>{{item.ratio}}%</v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs8 class="comment-container">
        <Comment />
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import Loader from '@/components/Loader'
import Comment from '@/components/CourseDetail/Comment'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    Loader,
    Comment
  },
  data() {
    return {
      rating: 4.0,
      emptyIcon: 'fa-star',
      fullIcon: 'fa-star',
      halfIcon: 'fa-star-half-alt',
      valueDeterminate: 40,
      loader: false,
      courseId: this.$route.params.courseId,
      listRatings: {},
      courseOverview: {}
    }
  },
  mounted() {
    this.loader = true
    this.getCourseOverview()
    this.loader = false
  },
  methods: {
    async getCourseOverview() {
      const { data } = await courseRepository.getCourseOverview(this.courseId)
      this.courseOverview = data.data
      this.calMedRating()
      this.calListRatings()
      this.listRatings = this.courseOverview.listRatings
    },
    calMedRating() {
      this.courseOverview.medRating =
        this.courseOverview.totalRatings /
        this.courseOverview.totalQuantityRatings
      this.courseOverview.medRating =
        Math.round(this.courseOverview.medRating * 10) / 10
    },
    calListRatings() {
      this.courseOverview.listRatings.forEach(element => {
        element.ratio = Math.round(element.ratio * 1000) / 10
      })
    }
  }
}
</script>

<style scoped>
.comment-container {
  border-left: 2px solid #e7eaec;
}
</style>
