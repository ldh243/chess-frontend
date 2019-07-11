<template>
  <v-layout v-if="courseDetail.courseId" wrap row>
    <Loader v-if="loader" />
    <v-flex xs12>
      <v-parallax :src="courseDetail.image" height="300">
        <v-container px-0>
          <v-layout fill-height row wrap>
            <v-flex xs12>
              <v-breadcrumbs :items="breadcrumbs" class="py-0">
                <template v-slot:divider>
                  <v-icon class="white--text">mdi-chevron-right</v-icon>
                </template>
              </v-breadcrumbs>
            </v-flex>
            <v-flex xs12>
              <span class="display-2">{{ courseDetail.name }}</span>
            </v-flex>
            <v-flex xs12 mr-3>
              <v-layout align-end fill-height wrap row>
                <v-flex xs4>
                  <v-avatar :size="50">
                    <img :src="courseDetail.author.avatar" />
                  </v-avatar>
                  <span class="white--text ml-2 subheading">{{ courseDetail.author.fullName }}</span>
                </v-flex>
                <v-flex xs4 py-2>
                  <v-layout row>
                    <v-flex xs6>
                      <v-layout align-center fill-height justify-end>
                        <v-icon class="white--text mr-2">fa-users</v-icon>
                        <span>{{ courseDetail.userEnrolleds.length }} Học viên</span>
                      </v-layout>
                    </v-flex>
                    <v-flex xs6 py-2>
                      <v-layout align-center fill-height justify-end>
                        <v-icon class="white--text mr-2">fa-book</v-icon>
                        <span>{{ courseDetail.totalLesson }} Bài học</span>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-parallax>
    </v-flex>
    <v-flex xs12>
      <v-container px-0>
        <v-layout row>
          <v-flex id="content-container" xs8>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">Thông tin chung</div>
                      <span>
                        Listen to your favorite artists and albums whenever and
                        wherever, online and offline.
                      </span>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs12 mt-3>
                <Curriculum :curriculum="courseDetail.lessonViewModels" />
              </v-flex>
              <v-flex xs12 mt-3>
                <InstructorInfo :author="courseDetail.author" />
              </v-flex>
              <v-flex xs12 mt-3>
                <Review />
              </v-flex>
            </v-layout>
          </v-flex>
          <div class="enrol-course">
            <v-card class="pa-1">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-img :src="courseDetail.image" height="190"></v-img>
                </v-flex>
                <v-flex xs12 pa-3>
                  <v-layout row wrap>
                    <v-flex xs12 mb-1>
                      <v-layout>
                        <span class="course-point">Điểm tiêu hao</span>
                        <v-spacer></v-spacer>
                        <span class="course-point">{{ courseDetail.point }} điểm</span>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 mb-1>
                      <v-layout>
                        <span class="regular-text">Điểm nhận được</span>
                        <v-spacer></v-spacer>
                        <span class="regular-text">{{ courseDetail.point }} điểm</span>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 mb-2>
                      <v-layout>
                        <span class="regular-text">Giảng viên</span>
                        <v-spacer></v-spacer>
                        <span class="regular-text">{{ courseDetail.author.fullName }}</span>
                      </v-layout>
                    </v-flex>
                    <v-flex x12 v-if="user != null">
                      <v-layout justify-end>
                        <v-btn
                          color="info"
                          class="ma-0"
                          v-if="courseDetail.enrolled"
                          @click="goToLearningPage()"
                        >Bắt đầu học</v-btn>
                        <v-btn
                          color="error"
                          class="ma-0"
                          v-else
                          @click="showConfirmEnrolCourse()"
                        >Đăng ký khóa học</v-btn>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </div>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex'
import Loader from '@/components/Loader'
import Review from '@/components/CourseDetail/Review'
import InstructorInfo from '@/components/CourseDetail/InstructorInfo'
import Curriculum from '@/components/CourseDetail/Curriculum'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    Loader,
    Review,
    InstructorInfo,
    Curriculum
  },
  data() {
    return {
      courseDetail: {},
      loader: false,
      breadcrumbs: [
        {
          text: 'Trang chủ',
          disabled: false,
          href: '/introduction'
        },
        {
          text: 'Khóa học',
          disabled: false,
          href: '/course'
        },
        {
          text: '',
          disabled: true
        }
      ],
      courseId: this.$route.params.courseId
    }
  },
  computed: {
    ...mapState({ user: state => state.user })
  },
  mounted() {
    this.loader = true
    this.getCourseById()
    this.loader = false
  },
  updated() {
    this.setEventScroll()
    this.setLayoutForEnrolDialog()
  },
  methods: {
    setEventScroll() {
      window.addEventListener('scroll', function() {
        const scroll = this.scrollY
        if (document.getElementsByClassName('enrol-course').length > 0) {
          if (scroll >= 380) {
            document.getElementsByClassName('enrol-course')[0].style.top = '0px'
          } else if (scroll >= 217) {
            document.getElementsByClassName('enrol-course')[0].style.top =
              380 - scroll + 'px'
          } else {
            document.getElementsByClassName('enrol-course')[0].style.top =
              '163px'
          }
        }
      })
    },
    async getCourseById() {
      const { data } = await courseRepository.getById(this.courseId)
      this.courseDetail = data.data
      this.breadcrumbs[
        this.breadcrumbs.length - 1
      ].text = this.courseDetail.name
      if (this.courseDetail.lessonViewModels != null) {
        this.getLessonType()
      }
    },
    showConfirmEnrolCourse() {
      this.$swal({
        title: 'Xác nhận?',
        text: `Bạn có chắc chắn sử dụng ${this.courseDetail.point} điểm để đăng ký khóa học này`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
      }).then(result => {
        if (result.value) {
          this.enrollCourse()
        }
      })
    },
    async enrollCourse() {
      const { data } = await courseRepository.enrollCourse(
        this.courseDetail.courseId
      )
      if (data.data) {
        this.courseDetail.enrolled = true
      }
    },
    goToLearningPage() {
      this.$router.push(`/learning/${this.courseDetail.courseId}`)
    },
    getLessonType() {
      this.courseDetail.lessonViewModels.forEach(element => {
        element.lessonTypeName = this.getLessonTypeName(element.lessonType)
      })
    },
    setLayoutForEnrolDialog() {
      const width = document.getElementsByClassName('container')[0].offsetWidth
      document.getElementsByClassName('enrol-course')[0].style.width =
        width * 0.333333333333 + 'px'

      const widthContent = document.getElementById('content-container')
        .offsetWidth

      document.getElementsByClassName('enrol-course')[0].style.marginLeft =
        widthContent + 16 + 'px'
    }
  }
}
</script>

<style scoped>
>>> .v-parallax__image {
  filter: blur(10px);
  opacity: 0.6;
}
>>> .v-parallax__content {
  background: rgba(0, 0, 0, 0.5);
}
.v-icon {
  font-size: 32px;
}
>>> .v-breadcrumbs a {
  color: white !important;
}
.enrol-course > div {
  border-radius: 7px;
}
.enrol-course {
  position: fixed;
  margin-left: 50%;
  width: 33.33333333333333%;
  border-radius: 7px;
  top: 163px;
}
.course-point {
  color: rgba(0, 0, 0, 0.87);
  font-size: 18px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
}
.regular-text {
  font-weight: 500;
}
</style>
