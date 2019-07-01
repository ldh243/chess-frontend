<template>
  <v-layout row wrap>
    <Loader v-if="loader"/>
    <EnrolCourseItem :course-enrol="courseEnrol"/>
    <v-flex
      v-for="(item, index) in listCourses"
      :key="index"
      class="course-item"
      :style="{ marginRight: index % 3 != 2 ? 'calc(1%)' : '0px' }"
      mb-3
    >
      <CourseItem :course-detail="item" @showEnrolDialog="showEnrolDialog"/>
    </v-flex>
  </v-layout>
</template>

<script>
import Loader from '@/components/Loader'
import CourseItem from '@/components/CourseOverview/CourseItem'
import EnrolCourseItem from '@/components/CourseOverview/EnrolCourseItem'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const courseRepository = RepositoryFactory.get('course')
export default {
  components: {
    CourseItem,
    Loader,
    EnrolCourseItem
  },
  data() {
    return {
      loader: false,
      listCourses: [],
      courseEnrol: {}
    }
  },
  mounted() {
    this.getCoursesPagination()
  },
  methods: {
    async getCoursesPagination() {
      this.loader = true
      const { data } = await courseRepository.getCoursesPagination(1, 500, 2)
      // this.listCourses = this.formatListCourse(data.data.content)
      this.listCourses = data.data.content
      this.loader = false
    },
    async showEnrolDialog(courseId) {
      this.loader = true
      //load cái khác mới gọi api
      if (courseId !== this.courseEnrol.courseId) {
        await this.getById(courseId)
      }
      this.loader = false
      this.$store.state.dialog.enrolDialog = true
    },
    async getById(courseId) {
      const { data } = await courseRepository.getById(courseId)
      this.courseEnrol = data.data
    }
  }
}
</script>

<style scoped>
.course-item {
  flex-basis: 32.6666666%;
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
}
</style>
