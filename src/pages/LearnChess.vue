<template>
  <v-app>
    <Header />
    <CourseOverview />
  </v-app>
</template>

<script>
import Header from '@/layouts/Header'
import CourseOverview from '@/layouts/Learner/CourseOverview'

export default {
  components: {
    Header,
    CourseOverview
  }
}
</script>

<style></style>
