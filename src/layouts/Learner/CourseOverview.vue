<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
        <v-flex
          v-for="(item, index) in listCourses"
          :key="index"
          class="course-item"
          :style="{ marginRight: index % 3 != 2 ? 'calc(1%)' : '0px' }"
          mb-3
        >
          <CoursesOverviewItem :content="item"/>
        </v-flex>
      </v-layout>
    </v-container>
    <Loader v-if="loader"/>
  </v-content>
</template>

<script>
import CoursesOverviewItem from '@/components/Learner/CoursesOverviewItem'
import Loader from '@/layouts/Learner/Loader'
export default {
  components: {
    CoursesOverviewItem,
    Loader
  },
  created() {
    let method = 'GET'
    let url = this.$store.state.api.getCoursesPagination
    let params = {
      page: '1',
      pageSize: '500'
    }
    this.loader++
    this.callAxios(method, url, params).then(result => {
      let obj = result.data.data.content
      this.listCourses = this.formatListCourse(obj)
      this.loader--
    })
  },
  data() {
    return {
      dialog: false,
      changeStatusDetail: {
        action: '',
        email: '',
        status: ''
      },
      loader: 0,
      search: '',
      pagination: {
        rowsPerPage: 10
      },
      listCourses: []
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
