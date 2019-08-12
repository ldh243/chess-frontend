<template>
  <v-card flat v-if="user !== null">
    <v-card-title class="tab-title">Thông tin tài khoản</v-card-title>
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
      <v-flex xs0 pl-5 pr-5>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout wrap>
            <v-flex xs3>
              <v-subheader>Họ và tên</v-subheader>
            </v-flex>
            <v-flex xs9>
              <v-text-field
                v-model="user.fullName"
                :counter="255"
                :rules="nameRules"
                label="Họ và tên"
                required
                solo
                clearable
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-subheader>Địa chỉ email</v-subheader>
            </v-flex>
            <v-flex xs9>
              <v-text-field :value="user.email" solo readonly label="E-mail"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-subheader>Vai trò</v-subheader>
            </v-flex>
            <v-flex xs9>
              <v-text-field value="Học viên" readonly solo label="Vai trò"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-subheader>Điểm</v-subheader>
            </v-flex>
            <v-flex xs9>
              <v-text-field :value="user.point" readonly solo label="Vai trò"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-layout>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" text color="success" @click="submit">Lưu</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const userRepository = RepositoryFactory.get('user')
export default {
  data() {
    return {
      user: null,
      valid: false,
      nameRules: [
        v => !!v || 'Họ và tên không được để trống.',
        v =>
          /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/g.test(
            v
          ) || 'Tên không được chứa số hoặc kí tự khác.',
        v => (v && v.length >= 6) || 'Họ và tên ít nhất phải 6 kí tự.',
        v => (v && v.length <= 255) || 'Họ và tên không được quá dài.'
      ]
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.$store.commit('incrementLoader', 1)
      await this.getCurrentUserDetail()
      setTimeout(() => {
        this.$store.commit('incrementLoader', -1)
      }, 500)
    },
    async getCurrentUserDetail() {
      const { data } = await userRepository.getCurrentUserDetail()
      this.user = data.data
    },
    async updateProfile() {
      const { data } = await userRepository.updateProfile(this.user)
      if (data.data) {
        localStorage.setItem('user', JSON.stringify(this.user))
        const user = JSON.parse(localStorage.getItem('user'))
        this.$store.commit('setUser', user)
        this.$swal({
          type: 'success',
          title: 'Thành  công',
          text: 'Cập nhật thông tin thành công.',
          confirmButtonText: 'Xác nhận'
        })
      }
    },
    uploadImageSuccess(formData, index, fileList) {
      this.certificates = fileList
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.updateProfile()
      }
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
>>> input {
  font-size: 14px !important;
}
.v-subheader {
  font-weight: 600 !important;
  font-size: 15px;
}
>>> .v-text-field.v-text-field--solo .v-input__control {
  min-height: 40px !important;
}
.v-input {
  height: 70px;
}
.tab-title {
  font-size: 18px;
}
</style>
