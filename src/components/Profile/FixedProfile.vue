<template>
  <v-form ref="form" lazy-validation>
    <v-card class="hide-overflow">
      <v-toolbar card>
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light"
          >Thông tin cá nhân</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-btn color="darken-3" fab small @click="isEditing = !isEditing">
          <v-icon v-if="isEditing">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          v-model="email"
          :disabled="!isEditing"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="firstname"
          :disabled="!isEditing"
          :rules="firstnameRules"
          :counter="10"
          label="Tên"
          required
        ></v-text-field>
        <v-text-field
          v-model="lastname"
          :disabled="!isEditing"
          :rules="lastnameRules"
          :counter="10"
          label="Họ"
          required
        ></v-text-field>
        <v-select
          v-model="status"
          :items="statusItems"
          :disabled="!isEditing"
          label="Trạng thái"
        ></v-select>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!isEditing" color="success" @click="save">Lưu</v-btn>
      </v-card-actions>
      <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left
        >Thông tin đã được cập nhật</v-snackbar
      >
    </v-card>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      status: 'Vô hiệu hóa',
      firstname: '',
      lastname: '',
      email: '',
      lastnameRules: [
        v => !!v || 'Vui lòng điền họ',
        v => v.length <= 10 || 'Họ phải ít hơn 10 kí tự'
      ],
      firstnameRules: [
        v => !!v || 'Vui lòng điền tên',
        v => v.length <= 10 || 'Tên phải ít hơn 10 kí tự'
      ],
      emailRules: [
        v => !!v || 'Vui lòng điền e-mail',
        v =>
          /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || 'Địa chỉ e-mail không hợp lệ'
      ],
      hasSaved: false,
      isEditing: null,
      statusItems: ['Vô hiệu hóa', 'Đang hoạt động']
    }
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        this.isEditing = !this.isEditing
        this.hasSaved = true
      }
    }
  }
}
</script>

<style></style>
