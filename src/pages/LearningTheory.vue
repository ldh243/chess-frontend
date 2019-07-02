<template>
  <v-container px-0>
    <v-card-title>Nội dung</v-card-title>
    <v-layout row>
      <v-flex xs8>
        <iframe
          width="100%"
          class="iframe-video"
          src="https://www.youtube.com/embed/xh4sO1ICS_Q"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </v-flex>
      <v-flex xs4>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Bài học</v-toolbar-title>
          </v-toolbar>
          <v-list height="300">
            <template v-for="(item, index) in lessons">
              <v-list-tile :key="index" avatar ripple @click="doNothing()">
                <v-list-tile-content>
                  <v-list-tile-title
                    >{{ index + 1 }}. {{ item.title }}</v-list-tile-title
                  >
                </v-list-tile-content>
                <v-list-tile-action>
                  <!-- <v-icon color="grey lighten-1">fa-check</v-icon> -->
                </v-list-tile-action>
              </v-list-tile>
              <v-divider
                v-if="index + 1 < lessons.length"
                :key="`divider-${index}`"
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      lessons: [
        { title: 'Cờ vua là  gì?' },
        { title: 'Nước cờ trong cờ vua' },
        { title: 'Quy định trong cờ vua' },
        { title: 'Các cách đi của từng con cờ' },
        { title: 'Các loại con cờ trong cờ vua' },
        { title: 'Khi nào thì thắng' },
        { title: 'Luật 50 bước trong cờ vua' },
        { title: 'Luật phong tốt' },
        { title: 'Cờ vua là  gì?' },
        { title: 'Nước cờ trong cờ vua' },
        { title: 'Quy định trong cờ vua' },
        { title: 'Các cách đi của từng con cờ' },
        { title: 'Các loại con cờ trong cờ vua' },
        { title: 'Khi nào thì thắng' },
        { title: 'Luật 50 bước trong cờ vua' },
        { title: 'Luật phong tốt' }
      ]
    }
  },
  mounted() {
    this.setHeightForIframe()
  },
  methods: {
    doNothing() {},
    setHeightForIframe() {
      const ratio = 16 / 9
      let iframe = document.getElementsByClassName('iframe-video')[0]
      const width = iframe.offsetWidth
      const height = width / ratio

      iframe.style.height = height + 'px'
    }
  }
}
</script>

<style scoped>
.v-list {
  height: 500px;
  overflow-y: scroll;
}
</style>
