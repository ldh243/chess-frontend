<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      class="black--text"
      :class="`elevation-${hover ? 12 : 2}`"
      @click="showEnrolDialog()"
    >
      <v-layout row wrap>
        <v-flex xs12>
          <v-img :src="courseDetail.courseImage" height="175px"></v-img>
        </v-flex>
        <v-flex xs12>
          <v-card-title primary-title class="pt-2">
            <v-flex xs12>
              <span class="course-title">{{ courseDetail.courseName }}</span>
            </v-flex>
            <v-flex xs2>
              <v-avatar :size="50">
                <img :src="courseDetail.authorAvatar" alt="avatar" />
              </v-avatar>
            </v-flex>
            <v-flex xs9 ml-3>
              <span class="ml-1 course-author">{{
                courseDetail.authorName
              }}</span>
              <v-layout row>
                <v-flex xs6>
                  <v-rating
                    v-model="rateScore"
                    readonly
                    small
                    empty-icon="$vuetify.icons.ratingFull"
                    half-increments
                  ></v-rating>
                </v-flex>
                <v-flex>
                  <v-layout align-center fill-height>
                    <span class="course-score">4.2</span>
                    <span class="ml-2 course-total-rate">(1724)</span>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-divider light></v-divider>
      <v-card-actions class="px-3">
        <v-spacer></v-spacer>
        <span class="course-point">{{ courseDetail.point }} điểm</span>
      </v-card-actions>
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
  methods: {
    showEnrolDialog() {
      this.$emit('showEnrolDialog', this.courseDetail.courseId)
      // this.$router.push(`/course/${this.courseDetail.courseId}`)
    }
  }
}
</script>

<style scoped>
.course-author {
  font-size: 14px;
  color: #686f7a;
}
.course-title {
  font-size: 17px;
  font-weight: 600;
  line-height: 32px !important;
  letter-spacing: normal !important;
  font-family: 'Open Sans', sans-serif !important;
}
>>> .v-rating .v-icon {
  padding: 3px;
}

.course-score {
  font-weight: 600;
  color: #505763;
  font-size: 14px;
}

.course-total-rate {
  font-size: 12px;
  font-weight: 400;
  color: #686f7a;
}
.course-point {
  font-size: 18px;
  color: #29303b;
  font-weight: 600;
}
</style>
