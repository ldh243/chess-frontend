<template>
  <v-card>
    <v-toolbar card prominent>
      <v-toolbar-title>Đăng kí</v-toolbar-title>
    </v-toolbar>
    <v-form ref="form" v-model="valid" lazy-validation class="pa-4">
      <v-hover>
        <v-avatar
          slot-scope="{ hover }"
          :tile="false"
          :size="100"
          color="grey lighten-4"
        >
          <img :src="avatar" alt="avatar" />
          <v-fade-transition>
            <div v-if="hover" class="upload-file">
              <span class="white--text lighten-3 body-1">Tải ảnh</span>
              <br />
              <v-btn class="ma-0" flat icon @click="avaDialog = true">
                <v-icon small color="grey lighten-3">fa-camera</v-icon>
              </v-btn>
            </div>
          </v-fade-transition>
        </v-avatar>
      </v-hover>
      <v-text-field
        v-model="email"
        label="E-mail"
        disabled
      ></v-text-field>
      <v-text-field
        v-model="fullName"
        v-validate="'required|max:50'"
        :counter="50"
        :rules="fullNameRules"
        label="Họ và tên"
        required
      ></v-text-field>
      <p class="subheading grey--text">Chọn loại tài khoản</p>
      <v-radio-group v-model="role" row>
        <v-radio color="primary" label="Học viên" value="learner"></v-radio>
        <v-radio
          color="primary"
          label="Người hướng dẫn"
          value="instructor"
        ></v-radio>
      </v-radio-group>
      <v-slide-y-transition>
        <v-textarea
          v-show="isInstructor"
          solo
          name="input-7-4"
          label="Thành tích"
          value
          v-model="achievement"
        ></v-textarea>
      </v-slide-y-transition>
      <v-slide-y-transition>
        <div>
          <p v-show="isInstructor" class="subheading grey--text">
            Các chứng nhận
          </p>
          <vue-upload-multiple-image
            v-show="isInstructor"
            @upload-success="uploadImageSuccess"
            @before-remove="beforeRemove"
          ></vue-upload-multiple-image>
        </div>
      </v-slide-y-transition>
      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'Bạn phải đồng ý để tiếp tục']"
        label="Bạn đã đọc các điều khoản sử dụng của hệ thống?"
        color="primary"
        required
      ></v-checkbox>
      <v-dialog v-model="avaDialog" max-width="382">
        <v-card>
          <v-card-title class="headline">Ảnh đại diện</v-card-title>

          <vue-avatar
            ref="vueavatar"
            :width="300"
            :height="300"
            :has-rotation="false"
            :border-radius="150"
            @finished="getAva"
          ></vue-avatar>
        </v-card>
      </v-dialog>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid" color="primary" @click="submit">Xác nhận</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import VueUploadMultipleImage from '@/components/plugins/vue-upload-multiple-image/VueUploadMultipleImage'
import { mapState } from 'vuex'
import VueAvatar from '@/components/plugins/vue-avatar/VueAvatarEditor'
import firebase from 'firebase'
import Repository, { setAuthorizationHeader } from '@/repository/Repository.js'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const userRepository = RepositoryFactory.get('user')

export default {
  name: 'RegisterForm',
  components: {
    VueUploadMultipleImage,
    VueAvatar
  },
  name: 'RegisterForm',
  components: {
    VueUploadMultipleImage,
    VueAvatar
  },
  data() {
    return {
      valid: true,
      role: 'learner',
      isInstructor: false,
      avaDialog: false,
      checkbox: false,
      isChangedAva: false,
      fullName: '',
      avatar: '',
      email: '',
      user: '',
      fullNameRules: [
        v => !!v || 'Tên không được bỏ trống',
        v => (v && v.length <= 50) || 'Tên không được quá 50 kí tự'
      ],
      achievement: ''
    }
  },
  created() {
    this.loader = true
    if (
      localStorage.getItem('access-token') != null &&
      this.$store.state.user === null
    ) {
      setAuthorizationHeader(Repository, localStorage.getItem('access-token'))
      this.getCurrentUserDetail()
    } else {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.fullName = this.user.fullName
      this.avatar = this.user.avatar
      this.email = this.user.email
    }
    this.loader = false
  },
  watch: {
    role: function(role) {
      this.role = role
      this.isInstructor = role == 'instructor'
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    async getCurrentUserDetail() {
      const { data } = await userRepository.getCurrentUserDetail()
      this.user = data.data
      this.fullName = this.user.fullName
      this.avatar = this.user.avatar
      this.email = this.user.email
    },
    uploadImageSuccess(formData, index, fileList) {
      this.certificates = fileList
      console.log(this.certificates)
    },
    getAva(data) {
      this.avatar = data.toDataURL()
      this.isChangedAva = true
      this.avaDialog = false
    },
    beforeRemove(index, done, fileList) {
      var r = confirm('Bạn muốn xóa hình ảnh này?')
      if (r == true) {
        done()
      }
    },
    async submit() {
      this.validate()
      let avatar = this.user.avatar, achievement = this.user.achievement, certificates = []
      //get email name of user
      let match = this.user.email.match(/^([^@]*)/)
      if (this.isChangedAva) {
      //upload image to firebase
        avatar = await this.uploadImageByDataURL(this.avatar, match[0], "ava")
      }
      if (this.isInstructor) {
        for (var i = 0; i < this.certificates.length; i++) {
          const image = await this.uploadImageByDataURL(this.certificates[i].path, match[0] + this.certificates[i].name, "certificates")
          certificates.push({certificateId: 0, certificateLink: image})
        }
        achievement = this.achievement
      }
      const data = {
        fullName: this.fullName,
        roleId: this.isInstructor ? 1 : 2,
        avatar: avatar,
        achievement: achievement,
        certificates: certificates,
        roleName: this.getRoleName(this.isInstructor ? 1 : 2),
        status: this.getStatusUser(this.isInstructor ? false : true)
      }
      const result = await userRepository.signUpNewAccount(data)
      // if isIntructor redirect to admin app
      if (this.isInstructor) {
        localStorage.removeItem('role')
        localStorage.removeItem('access-token')
        localStorage.removeItem('user')
        let r = confirm('Đăng kí tài khoản thành công, chuyển đến trang quản trị?')
        if (r == true) {
          window.location.href = 'http://admin-cols.ml/'
          done()
        } else {
          this.$router.push('/')
        }
      } else {
        this.$router.push({name: 'home', params: {isNew: true}})
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
  width: 100px;
  height: 50px;
  overflow: hidden;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
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
