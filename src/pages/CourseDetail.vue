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
            <v-flex xs12>
              <v-layout align-end fill-height wrap row>
                <v-flex xs5>
                  <v-avatar :size="50">
                    <img :src="courseDetail.author.avatar" />
                  </v-avatar>
                  <span class="white--text ml-2 subheading">
                    {{ courseDetail.author.fullName }}
                  </span>
                </v-flex>
                <v-flex xs2 py-2>
                  <v-layout align-center fill-height justify-end>
                    <v-icon class="white--text mr-2">fa-users</v-icon>
                    <span
                      >{{ courseDetail.userEnrolleds.length }} Học viên</span
                    >
                  </v-layout>
                </v-flex>
                <v-flex xs5 py-2>
                  <v-layout align-center fill-height justify-end>
                    <v-icon class="white--text mr-2">fa-book</v-icon>
                    <span>{{ courseDetail.totalLesson }} Bài học</span>
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
          <v-flex xs8 mr-3>
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
                <v-card>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">Nội dung khóa học</div>
                      <span>
                        Listen to your favorite artists and albums whenever and
                        wherever, online and offline.
                      </span>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs12 mt-3>
                <InstructorInfo />
              </v-flex>
              <v-flex xs12 mt-3>
                <Review />
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs4>
            <v-layout row wrap>
              <v-flex xs12 mb-3>
                <v-card>
                  <v-btn block flat class="ma-0" @click="goToLearningPage()"
                    >Bắt đầu học</v-btn
                  >
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card>
                  <v-timeline>
                    <v-timeline-item
                      v-for="n in 4"
                      :key="n"
                      color="red lighten-2"
                      large
                    >
                      <template v-slot:opposite>
                        <span>Tus eu perfecto</span>
                      </template>
                      <v-card class="elevation-2">
                        <v-card-title class="headline py-0">Lorem</v-card-title>
                        <v-card-text>Bài học {{ n }}</v-card-text>
                      </v-card>
                    </v-timeline-item>
                  </v-timeline>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import Loader from '@/components/Loader'
import Review from '@/components/CourseDetail/Review'
import InstructorInfo from '@/components/CourseDetail/InstructorInfo'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    Loader,
    Review,
    InstructorInfo
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
  mounted() {
    this.loader = true
    this.getCourseById()
    this.loader = false
  },
  methods: {
    async getCourseById() {
      const { data } = await courseRepository.getById(this.courseId)
      this.courseDetail = data.data
      this.breadcrumbs[
        this.breadcrumbs.length - 1
      ].text = this.courseDetail.name
    },
    goToLearningPage() {
      this.$router.push(`/learning/${this.courseDetail.courseId}`)
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
</style>
