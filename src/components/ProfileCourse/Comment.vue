<template>
  <div>
    <v-card>
      <div class="text-xs-center">
        <h2>Tổng quan đánh giá:</h2>
        <v-rating v-model="rating"></v-rating>
      </div>
      <hr>
      <div>
        <h3>Bình luận</h3>
      </div>
      <hr>
      <v-list three-line>
        <template v-for="(item, index) in items">
          <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

          <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

          <v-list-tile v-else :key="item.name">
            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="item.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rating: 3,
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          name: 'Đặng Văn Lâm',
          subtitle: 'Dễ hiểu'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          name: 'Công Phượng',
          subtitle: 'Hay'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          name: 'Văn Toàn',
          subtitle: 'Cần phát huy'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          name: 'Quang Hải',
          subtitle: 'Cảm ơn Chess Study'
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          name: 'Đoàn Văn Hậu',
          subtitle: 'Quá tuyệt vời !!!'
        }
      ]
    }
  }
}
</script>

<style>
</style>
