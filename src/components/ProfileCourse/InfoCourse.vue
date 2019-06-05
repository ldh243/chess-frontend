<template>
  <v-form v-model="valid">
    <div>
      <v-card color="light-blue lighten-4">
        <v-breadcrumbs class="h1" :items="items" divider=">"></v-breadcrumbs>
      </v-card>
    </div>
    <div id="c1">
      <div id="c2">
        <v-flex xs3>
          <material-card class="v-card-profile">
            <img
              src="https://vnwriter.net/wp-content/uploads/2018/11/sach-hay-ve-co-vua-780x405.jpg"
              class="mx-auto d-block"
              height="70"
            >
            <v-card-text class="text-xs-center">
              <h4>Khóa học 1</h4>
            </v-card-text>
          </material-card>
        </v-flex>
      </div>
      <div id="c3">
        <v-flex xs12>
          <router-link to="/enrolcourse">
            <v-btn large color="primary" id="h1">Ghi danh ngay</v-btn>
          </router-link>
        </v-flex>
      </div>
    </div>
    <div>
      <OverviewCourse/>>
    </div>
  </v-form>
</template>

<script>
import OverviewCourse from '@/components/ProfileCourse/OverviewCourse'
export default {
  components: {
    OverviewCourse
  },
  data: () => ({
    items: [
      {
        text: 'Trang chủ',
        disabled: false,
        href: ''
      },
      {
        text: 'Khóa học 1',
        disabled: true,
        href: ''
      }
    ]
  })
}
</script>

<style>
#h1 {
  width: 200px;
  font: bold;
}
#h2 {
  width: 300px;
  color: black;
  font: bold;
}
#c1 {
  opacity: 50%;
  background: azure;
  opacity: 50%;
  height: 130px;
}
#c2 {
  background: azure;
  color: black;
  width: 1000px;
  float: left;
  padding-left: 300px;
  padding: 1em;
  height: 100px;
}

#c3 {
  background: azure;
  color: white;
  width: 300px;
  height: 100px;
  float: right;
  padding-top: 40px;
}
</style>
