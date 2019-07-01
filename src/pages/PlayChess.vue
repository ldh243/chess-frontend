<template>
  <v-container px-0>
    <v-card-title>
      <h2>Chơi cờ</h2>
    </v-card-title>
    <v-layout row wrap>
      <v-flex xs9>
        <chessboard :show-threats="true" :on-promotion="promote"/>
      </v-flex>
      <v-flex xs3>
        <button id="startBtn">Start Position</button>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Phong tốt</v-card-title>
        <v-card-text>Bạn muốn chọn con gì để phong tốt</v-card-text>
        <v-select v-model="promoteTo" :items="items"></v-select>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">Xác nhận</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      promoteTo: 'q',
      items: ['q', 'b', 'r', 'k']
    }
  },
  created() {},
  methods: {
    async handleData() {
      this.dialog = true

      while (this.dialog === true) {
        await this.sleep(2000)
      }
      console.log('Chon: ' + this.promoteTo)
      return this.promoteTo
    },
    promote() {
      if (confirm('Want to promote to rook? Queen by default')) {
        return 'r'
      } else {
        return 'q'
      }
    },

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}
</script>

<style scoped>
>>> piece,
.blue {
  background-color: transparent !important;
}
</style>
