<template>
  <v-dialog v-model="$store.state.dialog.confirmEnrolDialog" width="400">
    <v-card>
      <v-card-title class="headline">Đăng ký</v-card-title>
      <v-card-text>
        Bạn có chắc chắn muốn sử dụng
        <b>{{ courseEnrol.point }} điểm</b> để đăng ký khóa học này?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="font-weight-bold"
          color="red darken-1"
          flat="flat"
          @click="$store.state.dialog.confirmEnrolDialog = false"
          >Hủy bỏ</v-btn
        >
        <v-btn
          class="font-weight-bold"
          color="green darken-1"
          flat="flat"
          @click="
            enrollCourse(), ($store.state.dialog.confirmEnrolDialog = false)
          "
          >Đồng ý</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const courseRepository = RepositoryFactory.get('course')
export default {
  props: {
    courseEnrol: {
      type: Object,
      default: null
    }
  },
  methods: {
    async enrollCourse() {
      const { data } = await courseRepository.enrollCourse(
        this.courseEnrol.courseId
      )
      if (data.data) {
        this.$emit('enrolSuccessful')
      }
    }
  }
}
</script>

<style></style>
