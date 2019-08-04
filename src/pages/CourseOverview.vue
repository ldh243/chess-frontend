<template>
  <v-container px-0>
    <v-layout wrap>
      <v-flex xs12>
        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-flex>
      <v-flex xs12>
        <ListCourse />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ListCourse from '@/components/CourseOverview/ListCourse'

export default {
  components: {
    ListCourse
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
