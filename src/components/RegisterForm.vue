<template>
  <v-card :key="editUser.email">
    <v-toolbar card prominent>
      <v-toolbar-title>Đăng kí</v-toolbar-title>
    </v-toolbar>
    <form class="pa-4">
      <v-hover>
        <v-avatar
          slot-scope="{ hover }"
          :tile="false"
          :size="100"
          color="grey lighten-4"
        >
          <img :src="editUser.avatar" alt="avatar" />
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
        v-model="editUser.email"
        :error-messages="emailErrors"
        label="E-mail"
        disabled="true"
      ></v-text-field>
      <v-text-field
        v-model="editUser.fullName"
        v-validate="'required|max:50'"
        :error-messages="fullNameErrors"
        :counter="50"
        label="Họ và tên"
        required
        @input="$v.editUser.fullName.$touch()"
        @blur="$v.editUser.fullName.$touch()"
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
        ></v-textarea>
      </v-slide-y-transition>
      <v-slide-y-transition>
        <div>
          <p v-show="isInstructor" class="subheading grey--text">
            Các chứng nhận
          </p>
          <vue-upload-multiple-image
            v-show="isInstructor"
            :data-images="images"
            @upload-success="uploadImageSuccess"
            @before-remove="beforeRemove"
            @edit-image="editImage"
            @data-change="dataChange"
          ></vue-upload-multiple-image>
        </div>
      </v-slide-y-transition>
      <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="Bạn có đồng ý với các điều khoản sử dụng của hệ thống?"
        color="primary"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
      ></v-checkbox>
      <v-dialog v-model="avaDialog" max-width="382">
        <v-card>
          <v-card-title class="headline">Ảnh đại diện</v-card-title>

          <vue-avatar
            ref="vueavatar"
            :width="300"
            :height="300"
            :scale="scale"
            :has-rotation="false"
            :border-radius="150"
            @vue-avatar-editor:image-ready="onImageReady"
            @finished="getAva"
          ></vue-avatar>
        </v-card>
      </v-dialog>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="submit">Xác nhận</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
import VueUploadMultipleImage from '@/components/plugins/vue-upload-multiple-image/VueUploadMultipleImage'
import { mapState } from 'vuex'
import VueAvatar from '@/components/plugins/vue-avatar/VueAvatarEditor'
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import firebase from 'firebase'
export default {
  name: 'RegisterForm',
  components: {
    VueUploadMultipleImage,
    VueAvatar
  },
  mixins: [validationMixin],
  validations: {
    fullName: { required, maxLength: maxLength(50) },
    checkbox: {
      checked(val) {
        return val
      }
    }
  },
  data() {
    return {
      role: 'learner',
      isInstructor: false,
      avaDialog: false,
      checkbox: false,
      isChangedAva: false,
      editUser: {
        email: null
      }
    }
  },
  computed: {
    ...mapState({ user: state => state.user }),
    fullNameErrors() {
      const errors = []
      if (!this.$v.editUser.fullName.$dirty) return errors
      !this.$v.editUser.fullName.maxLength &&
        errors.push('Tên không được quá 50 kí tự')
      !this.$v.editUser.fullName.required &&
        errors.push('Tên không được bỏ trống')
      return errors
    },
    checkboxErrors() {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('Bạn phải đồng ý để tiếp tục')
      return errors
    }
  },
  watch: {
    role: function(role) {
      this.role = role
      this.isInstructor = role == 'instructor'
    }
  },
  beforeUpdate() {
    this.editUser = this.user
  },
  methods: {
    getAva(data) {
      this.avatar = data.toDataURL()
      this.isChangedAva = true
      this.avaDialog = false
    },
    beforeRemove(index, done, fileList) {
      console.log('index', index, fileList)
      var r = confirm('remove image')
      if (r == true) {
        done()
      }
    },
    submit() {
      this.$v.$touch()
      if (this.isChangedAva) {
        //get email name of user
        let match = this.user.email.match(/^([^@]*)/)
        //upload image to firebase
        const uploadTask = firebase
          .storage()
          .ref(`images/ava/${match[0]}`)
          .putString(this.avatar, 'data_url')

        uploadTask.on('state_changed', () => {
          firebase
            .storage()
            .ref('images/ava')
            .child(`${match[0]}`)
            .getDownloadURL()
            .then()
        })
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
