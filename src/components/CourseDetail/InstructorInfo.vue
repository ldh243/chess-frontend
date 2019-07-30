<template>
  <v-card>
    <v-card-title primary-title>
      <div class="title-instructor">Giảng viên</div>
    </v-card-title>
    <v-layout row pa-3 wrap>
      <v-flex xs2 mr-4>
        <v-avatar :size="120">
          <img :src="author.avatar" />
        </v-avatar>
      </v-flex>
      <v-flex xs5>
        <v-layout py-3 row align-center wrap justify-center>
          <v-flex xs12>Giảng viên</v-flex>
          <v-flex xs12 py-1 class="author-fullname text-truncate">
            {{ author.fullName }}
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  props: {
    author: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.title-instructor {
  font-size: 18px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0.3px;
}
.author-fullname {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0.3px;
}
</style>
