<template>
  <v-container px-0>
    <v-layout row wrap>
      <v-flex xs12>
        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-flex>
      <v-flex xs12>
        <CourseOverview />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CourseOverview from '@/components/CourseOverview/CourseOverview'

export default {
  components: {
    CourseOverview
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Trang chủ',
          disabled: false,
          href: '/'
        },
        {
          text: 'Khóa học',
          disabled: true
        }
      ]
    }
  }
}
</script>

<style></style>
