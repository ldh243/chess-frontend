<template>
  <v-container>
    <v-card-title>
      <h2>Chơi cờ</h2>
    </v-card-title>
    <v-layout row wrap>
      <v-flex xs9>
        <chessboard :showThreats="true" :onPromotion="promote"/>
      </v-flex>
      <v-flex xs3>
        <button id="startBtn">Start Position</button>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Phong tốt</v-card-title>
        <v-card-text>Bạn muốn chọn con gì để phong tốt</v-card-text>
        <v-select :items="items" v-model="promoteTo"></v-select>
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
  },
  data() {
    return {
      dialog: false,
      promoteTo: 'q',
      items: ['q', 'b', 'r', 'k']
    }
  }
}
</script>

<style scoped>
>>> piece,
.blue {
  background-color: transparent !important;
}
>>> .cg-board-wrap {
  width: 500px !important;
  height: 500px !important;
}

>>> .cg-board-wrap coords {
  font-size: 20px !important;
}
</style>