<template>
  <v-layout v-if="courseDetail.courseId" wrap row>
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
              <span class="course-title">{{ courseDetail.name }}</span>
            </v-flex>
            <v-flex xs12>
              <v-layout align-end fill-height wrap row>
                <v-flex xs4>
                  <v-layout fill-height align-center>
                    <v-avatar :size="36">
                      <img :src="courseDetail.author.avatar" />
                    </v-avatar>
                    <span class="white--text ml-2 subheading">
                      {{ courseDetail.author.fullName }}
                    </span>
                  </v-layout>
                </v-flex>
                <v-flex xs4>
                  <v-layout row fill-height align-end>
                    <v-flex xs6>
                      <v-layout align-center fill-height justify-end>
                        <img :src="imageIcon.classMates" height="36" />
                        <span class="ml-2">
                          {{ courseDetail.userEnrolleds.length }} Học viên
                        </span>
                      </v-layout>
                    </v-flex>
                    <v-flex xs6>
                      <v-layout align-center fill-height justify-end>
                        <img :src="imageIcon.lessons" height="36" />
                        <span class="ml-2"
                          >{{ courseDetail.totalLesson }} Bài học</span
                        >
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
              <v-flex xs12 class="title-direction">
                <v-card>
                  <v-layout justify-space-around pt-1>
                    <div
                      v-for="(item, index) in subMenu"
                      :key="index"
                      class="sub-menu text-black py-2"
                      @click="scrollTo(item.target)"
                    >
                      {{ item.title }}
                    </div>
                  </v-layout>
                </v-card>
              </v-flex>
              <v-flex id="about-course" xs12 mt-3>
                <About />
              </v-flex>
              <v-flex id="curriculum-course" xs12 mt-3>
                <Curriculum :curriculum="courseDetail.lessonViewModels" />
              </v-flex>
              <v-flex id="author-course" xs12 mt-3>
                <InstructorInfo :author="courseDetail.author" />
              </v-flex>
              <v-flex id="review-course" xs12 mt-3>
                <Review />
              </v-flex>
            </v-layout>
          </v-flex>
          <div id="enrol-course">
            <v-card class="pa-1">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-img :src="courseDetail.image" height="190"></v-img>
                </v-flex>
                <v-flex xs12 pa-3>
                  <v-layout row wrap>
                    <v-flex xs12 mb-1>
                      <v-layout>
                        <span class="course-point">Điểm yêu cầu</span>
                        <v-spacer></v-spacer>
                        <span class="course-point"
                          >{{ courseDetail.requiredPoint }} điểm</span
                        >
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 mb-1>
                      <v-layout>
                        <span class="course-point">Điểm nhận được</span>
                        <v-spacer></v-spacer>
                        <span class="course-point"
                          >{{ courseDetail.point }} điểm</span
                        >
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 mb-2>
                      <v-layout>
                        <span class="course-point">Giảng viên</span>
                        <v-spacer></v-spacer>
                        <span class="course-point">
                          {{ courseDetail.author.fullName }}
                        </span>
                      </v-layout>
                    </v-flex>
                    <v-flex v-if="user != null" x12>
                      <v-layout justify-end>
                        <v-btn
                          v-if="courseDetail.enrolled"
                          color="info"
                          class="ma-0 white--text"
                          @click="goToLearningPage()"
                          >Bắt đầu học</v-btn
                        >
                        <v-btn
                          v-else
                          color="error"
                          class="ma-0"
                          @click="showConfirmEnrolCourse()"
                          >Đăng ký khóa học</v-btn
                        >
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
import Review from '@/components/CourseDetail/Review'
import InstructorInfo from '@/components/CourseDetail/InstructorInfo'
import Curriculum from '@/components/CourseDetail/Curriculum'
import About from '@/components/CourseDetail/About'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    Review,
    InstructorInfo,
    Curriculum,
    About
  },
  data() {
    return {
      courseDetail: {},
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
      courseId: this.$route.params.courseId,
      subMenu: [
        {
          title: 'Thông tin chung',
          target: 'about-course'
        },
        {
          title: 'Giáo trình',
          target: 'curriculum-course'
        },
        {
          title: 'Giảng viên',
          target: 'author-course'
        },
        {
          title: 'Đánh giá',
          target: 'review-course'
        }
      ],
      imageIcon: {
        classMates: require('@/assets/images/classmates.png'),
        lessons: require('@/assets/images/lessons.png')
      }
    }
  },
  computed: {
    ...mapState({ user: state => state.user })
  },
  mounted() {
    this.$store.commit('incrementLoader', 1)
    this.getCourseById()
    setTimeout(() => {
      this.$store.commit('incrementLoader', -1)
    }, 500)
  },
  updated() {
    this.setEventScroll()
    this.setLayoutForEnrolDialog()
  },
  methods: {
    scrollTo(target) {
      const divTarget = document.getElementById(target)
      window.scrollTo({
        behavior: 'smooth',
        top: divTarget.offsetTop,
        block: 'end',
        inline: 'nearest'
      })
    },
    setEventScroll() {
      window.addEventListener('scroll', function() {
        const scroll = this.scrollY
        if (document.getElementById('enrol-course').length !== null) {
          if (scroll >= 380) {
            document.getElementById('enrol-course').style.top = '0px'
          } else if (scroll >= 217) {
            document.getElementById('enrol-course').style.top =
              380 - scroll + 'px'
          } else {
            document.getElementById('enrol-course').style.top = '163px'
          }
        }
      })
    },
    async getCourseById() {
      const { data } = await courseRepository.getById(this.courseId)
      this.courseDetail = data.data
      console.log(this.courseDetail)
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
        text: `Bạn có chắc chắn sử dụng ${
          this.courseDetail.point
        } điểm để đăng ký khóa học này`,
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
      document.getElementById('enrol-course').style.width =
        width * 0.333333333333 + 'px'

      const widthContent = document.getElementById('content-container')
        .offsetWidth

      document.getElementById('enrol-course').style.marginLeft =
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
#enrol-course > div {
  border-radius: 7px;
}
#enrol-course {
  position: fixed;
  margin-left: 50%;
  width: 33.33333333333333%;
  border-radius: 7px;
  top: 163px;
}
.course-point {
  color: #4d4d4d;
  font-size: 14px;
  font-weight: 600;
}
.course-title {
  font-size: 32px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: 0.7px;
}
.v-card {
  border-radius: 4px;
}
.sub-menu {
  font-size: 14px;
  font-weight: 600;
  border-bottom: 3px solid transparent;
}
.sub-menu:hover {
  border-bottom-color: #393b41;
  cursor: pointer;
}
.title-direction {
  position: sticky;
  top: 0;
  z-index: 99;
}
.btn-learn {
  font-weight: 600;
}
</style>
