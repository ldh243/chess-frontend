<template>
  <div>

        <div>
          <v-expansion-panel>
            <h2>Giáo trình khóa học</h2>
          </v-expansion-panel>
        </div>
       <v-expansion-panel v-model="panel" @expand="onFocus($event, i)">
          <v-expansion-panel-content v-for="(item,i) in items" :value="i==panel" :key="`expansion-${i}`" @input="onInput($event, i)" @focus="$emit($event, i)">
            <template v-slot:header>
              <div>Chương {{i + 1}}: {{item.title}} </div>
            </template>
            <v-card>
              <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      panel: [],
   
         items:[
             {
                complete: true,
        title: "Tổng quan khóa học",
        fields: [
        ]
      },
      {
        complete: false,
        title: "Giới thiệu quân cờ"
      }
         ]
    }   
  },
  methods: {
    // Create an array the length of our items
    // with all values as true
    all() {
      this.panel = [...Array(this.items).keys()].map(_ => true)
    },
    // Reset the panel
    none() {
      this.panel = []
    }
  }
}
</script>

<style>
#o1 {
  border: hidden;
}
</style>
