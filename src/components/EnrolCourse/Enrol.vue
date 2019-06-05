<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <div id="e1">
        <v-alert :value="true" type="success">Chúc mừng bạn đã ghi danh khóa học thành công.</v-alert>
      </div>
      <div>
        <v-alert :value="true" type="warning">Bạn không đủ điểm để ghi danh vào khóa học này!</v-alert>
      </div>
      <div id="e1">
        <router-link to="/">
          <h3>Quay lại trang chủ</h3>
        </router-link>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {}
</script>

<style>
#e1 {
  padding-top: 100px;
}
</style>
