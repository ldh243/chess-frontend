<template>
  <v-layout row justify-center>
    <v-dialog
      :key="courseEnrol.courseId"
      v-model="$store.state.dialog.enrolDialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">
            <span class="font-weight-bold">Khóa học:</span>
            {{ courseEnrol.name }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xs class="py-0">
            <v-layout row wrap>
              <v-flex xs12>
                <v-layout row>
                  <v-flex xs4 mr-4>
                    <v-layout wrap row>
                      <v-flex xs12>
                        <v-img :src="courseEnrol.authorAvatar"></v-img>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs8>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <span class="subheading"
                          >Giảng viên: {{ courseEnrol.authorName }}</span
                        >
                      </v-flex>
                      <v-flex xs12>
                        <span class="subheading"
                          >Số bài: {{ courseEnrol.totalLesson }}</span
                        >
                      </v-flex>
                      <v-flex xs12>
                        <span class="subheading"
                          >Điểm yêu cầu: {{ courseEnrol.point }}</span
                        >
                      </v-flex>
                      <v-flex xs12>
                        <span class="subheading">Số người học: 0</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 mt-3>
                <span class="subheading"
                  >Nội dung khóa học: {{ courseEnrol.description }}</span
                >
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions v-if="user != null">
          <v-spacer></v-spacer>
          <div v-if="!courseEnrol.enrolled">
            <v-btn
              class="font-weight-bold"
              color="error"
              flat
              @click="$store.state.dialog.enrolDialog = false"
              >Đóng</v-btn
            >
            <v-btn
              class="font-weight-bold"
              color="success"
              flat
              @click="$store.state.dialog.confirmEnrolDialog = true"
              >Đăng ký</v-btn
            >
          </div>
          <div v-else>
            <v-btn
              class="font-weight-bold"
              color="success"
              flat
              @click="goToCourseDetail()"
              >Xem chi tiết khóa học</v-btn
            >
          </div>
        </v-card-actions>
        <v-card-actions v-else>
          <v-spacer></v-spacer>
          <span class="error--text"
            >*Vui lòng đăng nhập để đăng ký khóa học</span
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ConfirmEnrolCourse
      :course-enrol="courseEnrol"
      @enrolSuccessful="enrolSuccessful"
    />
  </v-layout>
</template>
<script>
import { mapState } from 'vuex'
import ConfirmEnrolCourse from '@/components/CourseOverview/ConfirmEnrolCourse'
export default {
  components: { ConfirmEnrolCourse },
  props: {
    courseEnrol: {
      type: Object,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({ user: state => state.user })
  },
  methods: {
    enrolSuccessful() {
      this.courseEnrol.enrolled = true
    },
    goToCourseDetail() {
      this.$store.state.dialog.enrolDialog = false
      this.$router.push(`/course/${this.courseEnrol.courseId}`)
    }
  }
}
</script>

<style scoped></style>
