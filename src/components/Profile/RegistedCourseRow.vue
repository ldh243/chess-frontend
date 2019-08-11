<template>
  <v-flex xs12>
    <v-layout v-if="courseGroup !== null">
      <v-flex xs3 v-for="(item, index) in this.courseGroup" :key="index">
        <RegistedCourseItem :course-detail="item" class="mb-2" />
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import RegistedCourseItem from '@/components/Profile/RegistedCourseItem'

export default {
  components: {
    RegistedCourseItem
  },
  props: {
    courseGroup: {
      type: Array,
      default: null
    }
  },
  mounted() {
    console.log(this.courseGroup)
  }
}
</script>

<style scoped>
</style>
