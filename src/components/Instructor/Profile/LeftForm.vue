<template>
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
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="firstname"
        :rules="firstnameRules"
        :counter="10"
        label="Tên"
        required
      ></v-text-field>
      <v-text-field
        v-model="lastname"
        :rules="lastnameRules"
        :counter="10"
        label="Họ"
        required
      ></v-text-field>
    </v-card-text>

    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="!isEditing" color="success" @click="save">Save</v-btn>
    </v-card-actions>
    <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left
      >Your profile has been updated</v-snackbar
    >
  </v-card>

  <!-- <v-form v-model="valid">
    <v-container>
      <v-layout column>
        <v-flex xs12 md4>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
            v-model="firstname"
            :rules="firstnameRules"
            :counter="10"
            label="Tên"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs12 md4>
          <v-text-field
            v-model="lastname"
            :rules="lastnameRules"
            :counter="10"
            label="Họ"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>-->
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
      email: '',
      emailRules: [
        v => !!v || 'Vui lòng điền e-mail',
        v => /.+@.+/.test(v) || 'Địa chỉ e-mail không hợp lệ'
      ],
      hasSaved: false,
      isEditing: null,
      model: null,
      states: [
        { name: 'Florida', abbr: 'FL', id: 1 },
        { name: 'Georgia', abbr: 'GA', id: 2 },
        { name: 'Nebraska', abbr: 'NE', id: 3 },
        { name: 'California', abbr: 'CA', id: 4 },
        { name: 'New York', abbr: 'NY', id: 5 }
      ]
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
