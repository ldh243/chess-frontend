<template>
  <v-form v-model="valid" class="enrolheader_layouts">
    <div>
      <v-card color="light-blue lighten-4">
        <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
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
          <div>
            <h3>Tác giả: {{author}}</h3>
          </div>
          <div id="c4">
            <h4>Đánh giá</h4>
          </div>
          <v-rating v-model="rating" background-color="pink lighten-3" color="pink"></v-rating>
        </v-flex>
      </div>
    </div>
    <div>
      <Enrol></Enrol>
    </div>
  </v-form>
</template>

<script>
import Enrol from '@/components/EnrolCourse/Enrol'
export default {
  components: {
    Enrol
  },
  data: () => ({
    rating: 4,
    author: 'Lê Quang Liêm',
    items: [
      {
        text: 'Trang chủ',
        disabled: false,
        href: '/'
      },
      {
        text: 'Khóa học 1',
        disabled: false,
        href: 'profilecourse'
      },
      { text: 'Ghi danh', disabled: true, href: '' }
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
  font: italic;
  color: black;
  padding-top: 30px;
}
#c4 {
  padding-top: 10px;
  padding-left: 60px;
}
</style>
