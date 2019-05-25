<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout column>
        <v-flex>
          <v-text-field
            v-model="firstname"
            :rules="phoneRules"
            :counter="10"
            label="Số điện thoại"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs12 md4>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs12 md4>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      firstname: '',
      lastname: '',
      lastnameRules: [
        v => !!v || 'Vui lòng điền họ',
        v => v.length <= 10 || 'Họ phải ít hơn 10 kí tự'
      ],
      firstnameRules: [
        v => !!v || 'Vui lòng điền tên',
        v => v.length <= 10 || 'Tên phải ít hơn 10 kí tự'
      ],
      phoneRules: [
        v => !!v || 'Vui lòng điền số điện thoại',
        v => /#######/.test(v) || 'Số điện thoại không hợp lệ'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Vui lòng điền e-mail',
        v => /.+@.+/.test(v) || 'Địa chỉ e-mail không hợp lệ'
      ]
    }
  }
}
</script>

<style></style>
