<template>
  <v-card flat v-if="user !== null">
    <v-card-title>Thông tin tài khoản</v-card-title>
    <v-layout class="pa-3">
      <v-flex xs2>
        <v-hover>
          <v-avatar slot-scope="{ hover }" :tile="false" :size="120" color="grey lighten-4">
            <img :src="user.avatar" alt="avatar" />
            <v-fade-transition>
              <div v-if="hover" class="upload-file">
                <span class="white--text lighten-3 body-1">Tải ảnh</span>
                <br />
                <v-btn class="ma-0" text icon @click="avaDialog = true">
                  <v-icon small color="grey lighten-3">fa-camera</v-icon>
                </v-btn>
              </div>
            </v-fade-transition>
          </v-avatar>
        </v-hover>
      </v-flex>
      <v-flex xs10>
        <v-layout>
          <form>
            <v-text-field
              v-model="name"
              v-validate="'required|max:10'"
              :counter="10"
              :error-messages="errors.collect('name')"
              label="Name"
              data-vv-name="name"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              v-validate="'required|email'"
              :error-messages="errors.collect('email')"
              label="E-mail"
              data-vv-name="email"
              required
            ></v-text-field>
            <v-select
              v-model="select"
              v-validate="'required'"
              :items="items"
              :error-messages="errors.collect('select')"
              label="Select"
              data-vv-name="select"
              required
            ></v-select>
            <v-checkbox
              v-model="checkbox"
              v-validate="'required'"
              :error-messages="errors.collect('checkbox')"
              value="1"
              label="Option"
              data-vv-name="checkbox"
              type="checkbox"
              required
            ></v-checkbox>

            <v-btn class="mr-4" @click="submit">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </form>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const userRepository = RepositoryFactory.get('user')
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data() {
    return {
      user: null
    }
  },
  mounted() {
    this.getCurrentUserDetail()
  },
  methods: {
    async getCurrentUserDetail() {
      const { data } = await userRepository.getCurrentUserDetail()
      this.user = data.data
    },
    uploadImageSuccess(formData, index, fileList) {
      this.certificates = fileList
    }
  }
}
</script>

<style scoped>
.v-avatar {
  display: block;
  margin: auto;
  position: relative;
}
.upload-file {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  bottom: 0;
  width: 120px;
  height: 60px;
  overflow: hidden;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
  z-index: 1;
  text-align: center;
}
.upload-file .v-btn {
  width: 26px;
  height: 26px;
}
.upload-file .v-icon {
  width: 23px;
  height: 23px;
}
</style>
