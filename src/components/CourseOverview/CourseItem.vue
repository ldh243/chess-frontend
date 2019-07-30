<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      class="black--text"
      :class="`elevation-${hover ? 12 : 2}`"
    >
      <v-layout row wrap pa-3>
        <v-flex xs4>
          <v-img
            :src="courseDetail.courseImage"
            height="170px"
            class="course-image"
            @click="goToCourseDetail()"
          ></v-img>
        </v-flex>
        <v-flex xs5>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title
                primary-title
                class="pt-2 pb-0 text-truncate course-title-container"
                @click="goToCourseDetail()"
              >
                <span class="course-title text-truncate text-black">{{
                  courseDetail.courseName
                }}</span>
              </v-card-title>
            </v-flex>
            <v-flex xs12 mb-2 class="pl-3">
              <span class="course-author"
                >T/g {{ courseDetail.author.fullName }}</span
              >
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs3 class="course-detail-container" pl-3>
          <v-layout justify-space-between fill-height column align-center>
            <v-flex style="width: 100%">
              <v-layout fill-height justify-center column align-center pt-3>
                <span class="course-point text-black"
                  >{{ courseDetail.point }} điểm</span
                >
                <span class="text-detail text-grey">
                  {{ courseDetail.courseCreatedDate }}
                </span>
                <v-layout align-center>
                  <v-rating
                    v-model="rateScore"
                    readonly
                    small
                    color="yellow darken-3"
                    empty-icon="$vuetify.icons.ratingFull"
                    half-increments
                  ></v-rating>
                  <span class="pt-1 ml-1 course-total-rate text-grey"
                    >(1724)</span
                  >
                </v-layout>
              </v-layout>
            </v-flex>
            <v-flex style="width: 100%">
              <v-layout fill-height align-end>
                <v-btn
                  class="ma-0 btn-detail"
                  outline
                  color="primary"
                  block
                  @click="goToCourseDetail()"
                  >Xem chi tiết</v-btn
                >
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    courseDetail: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      rateScore: 4.2
    }
  },
  mounted() {
    // console.log(this.courseDetail)
  },
  methods: {
    goToCourseDetail() {
      this.$router.push(`/course/${this.courseDetail.courseId}`)
    }
  }
}
</script>

<style scoped>
.course-author {
  font-size: 13px;
  color: #686f7a;
}
.course-title {
  font-size: 16px;
  font-weight: 700;
  line-height: 24px !important;
}
>>> .v-rating .v-icon {
  padding: 0px;
}

.course-score {
  font-weight: 600;
  color: #505763;
  font-size: 14px;
}

.course-total-rate {
  font-size: 12px;
  font-weight: 400;
}
.course-point {
  font-size: 18px;
  font-weight: 700;
}
.course-detail-container {
  border-left: 1px solid hsl(0, 0%, 90%);
}
.btn-detail {
  font-weight: 600;
}
.text-detail {
  font-size: 12px;
}
.course-image:hover,
.course-title-container:hover {
  cursor: pointer;
}
.course-title-container:hover {
  text-decoration: underline;
}
</style>
