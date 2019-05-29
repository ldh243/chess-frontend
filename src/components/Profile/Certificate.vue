<template>
  <v-card class="hide-overflow">
    <v-toolbar card>
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">Thành tích</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="darken-3" fab small @click="isEditing = !isEditing">
        <v-icon v-if="isEditing">mdi-close</v-icon>
        <v-icon v-else>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-textarea
        :disabled="!isEditing"
        name="input-7-1"
        label="Giải thưởng"
        auto-grow
      ></v-textarea>
    </v-card-text>

    <v-divider></v-divider>
    <v-card-actions>
      <!-- <upload-btn large :disabled="!isEditing" :max_files="5">
        <template slot="icon">
          <v-icon>add</v-icon>
        </template>
      </upload-btn>-->
      <upload-image url :max_files="5"></upload-image>
      <v-spacer></v-spacer>
      <v-btn :disabled="!isEditing" color="success" @click="save">Lưu</v-btn>
    </v-card-actions>
    <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left
      >Thông tin đã được cập nhật</v-snackbar
    >
  </v-card>
</template>

<script>
import UploadImage from 'vue-upload-image'
// import UploadButton from 'vuetify-upload-button'
export default {
  components: {
    // 'upload-btn': UploadButton
    UploadImage
  },
  data() {
    return {
      hasSaved: false,
      isEditing: null
    }
  },
  methods: {
    save() {
      this.isEditing = !this.isEditing
      this.hasSaved = true
    }
  }
}
</script>

<style></style>
