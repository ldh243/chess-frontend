<template>
  <v-card>
    <v-card-title>Đăng ký</v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation class="pa-4">
      <v-hover>
        <v-avatar slot-scope="{ hover }" :tile="false" :size="100" color="grey lighten-4">
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
      <v-text-field v-model="user.email" label="E-mail" disabled></v-text-field>
      <v-text-field
        v-model="user.fullName"
        :counter="50"
        :rules="fullNameRules"
        label="Họ và tên"
        required
      ></v-text-field>
      <p class="subheading grey--text">Chọn loại tài khoản</p>
      <v-radio-group v-model="role" row>
        <v-radio color="primary" label="Học viên" value="learner"></v-radio>
        <v-radio color="primary" label="Người hướng dẫn" value="instructor"></v-radio>
      </v-radio-group>
      <v-slide-y-transition>
        <v-textarea
          v-show="isInstructor"
          v-model="user.achievement"
          solo
          name="input-7-4"
          label="Thành tích"
          value
        ></v-textarea>
      </v-slide-y-transition>
      <v-slide-y-transition>
        <div>
          <p v-show="isInstructor" class="subheading grey--text">Các chứng nhận</p>
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
            :width="300"
            :height="300"
            :has-rotation="false"
            :border-radius="150"
            @finished="handlerUploadImage"
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
import VueAvatar from '@/components/plugins/vue-avatar/VueAvatarEditor'
import Repository, { setAuthorizationHeader } from '@/repository/Repository.js'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const userRepository = RepositoryFactory.get('user')
import firebase from 'firebase'
import { setInterval, clearInterval } from 'timers'
export default {
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
      user: '',
      fullNameRules: [
        v => !!v || 'Tên không được bỏ trống',
        v => (v && v.length <= 50) || 'Tên không được quá 50 kí tự'
      ],
      imageUrl: null,
      listUpload: [],
      isChangedAvatar: false
    }
  },
  watch: {
    role: function(role) {
      this.role = role
      this.isInstructor = role == 'instructor'
    }
  },
  created() {
    this.$store.commit('incrementLoader', 1)
    if (
      localStorage.getItem('access-token') != null &&
      this.$store.state.user === null
    ) {
      setAuthorizationHeader(Repository, localStorage.getItem('access-token'))
      this.getCurrentUserDetail()
    } else {
      this.user = JSON.parse(localStorage.getItem('user'))
    }
    setTimeout(() => {
      this.$store.commit('incrementLoader', -1)
    }, 500)
  },
  methods: {
    async getCurrentUserDetail() {
      const { data } = await userRepository.getCurrentUserDetail()
      this.user = data.data
    },
    uploadImageSuccess(formData, index, fileList) {
      this.certificates = fileList
    },
    handlerUploadImage(data) {
      this.user.avatar = data.toDataURL()
      this.isChangedAvatar = true
      this.avaDialog = false
    },
    beforeRemove(index, done) {
      done()
    },
    async submit() {
      this.$store.commit('incrementLoader', 1)
      let match = this.user.email.match(/^([^@]*)/)
      if (this.isChangedAvatar) {
        this.uploadImageByDataURL(this.user.avatar, match[0], 'ava')
      }
      this.user.roleId = 2
      if (this.isInstructor) {
        this.user.roleId = 1
        this.certificates.forEach(el => {
          this.uploadImageByDataURL(el.path, match[0] + el.name, 'certificates')
        })
      }
      var checkUploadImgProgress = setInterval(() => {
        let done = true
        this.listUpload.forEach(el => {
          if (!el.done) {
            done = false
          }
        })

        if (done) {
          this.user.certificates = []
          this.listUpload.forEach(el => {
            if (el.directory === 'certificates') {
              this.user.certificates.push({
                certificateLink: el.url
              })
            } else if (el.directory === 'ava') {
              this.user.avatar = el.url
            }
          })
          this.signUpNewAccount()
          clearInterval(checkUploadImgProgress)
        }
      }, 1000)
    },
    async uploadImageByDataURL(image, imageName, directory) {
      const uploadTask = firebase
        .storage()
        .ref(`images/${directory}/${imageName}`)
        .putString(image, 'data_url')
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        null,
        null,
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            newImage.done = true
            newImage.url = downloadURL
          })
        }
      )
      let newImage = {
        file: uploadTask,
        done: false,
        url: null,
        directory: directory
      }

      this.listUpload.push(newImage)
    },
    async signUpNewAccount() {
      this.user.active = true
      this.user.fullName = this.user.fullName.trim()
      if (this.user.achievement !== null) {
        this.user.achievement = this.user.achievement.trim()
      }
      const { data } = await userRepository.signUpNewAccount(this.user)
      if (data.data) {
        this.user = data.data
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.removeItem('role')
        localStorage.setItem('role', this.user.roleId)
        this.$store.commit('setUser', this.user)
        if (this.isInstructor) {
          let r = confirm(
            'Đăng kí tài khoản thành công, chuyển đến trang quản trị?'
          )
          if (r == true) {
            window.location.href = 'http://admin-cols.ml/'
          } else {
            this.$router.push('/')
          }
        } else {
          this.$router.push({ name: 'home', params: { isNew: true } })
        }
      }
      setTimeout(() => {
        this.$store.commit('incrementLoader', -1)
      }, 500)
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
