<template>
  <v-form v-model="valid">
    <v-flex>
      <v-img contain height="100" :src="chessLogo"></v-img>
    </v-flex>
    <v-flex class="h1">
      <h1>Thông tin tài khoản Gmail</h1>
    </v-flex>
    <v-flex xs12 md5>
      <v-card-title class="headline font-weight-regular blue-grey black--text">
        Thông tin cá nhân !
        <v-icon color="red">mdi-pen-lock</v-icon>
      </v-card-title>
    </v-flex>
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <v-text-field label="Email" email></v-text-field>
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field label="Họ" first-name></v-text-field>
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field label="Tên" last-name></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-flex xs12 md5>
      <v-card-title class="headline font-weight-regular blue-grey black--text">
        Thông tin liên lạc !
        <v-icon color="#CCCCCC">mdi-pen</v-icon>
      </v-card-title>
    </v-flex>
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <v-text-field label="Số điện thoại" phone-number></v-text-field>
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field label="Tỉnh(Thành phố)" city></v-text-field>
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field label="Quận(Huyện)" district></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout>
        <v-flex xs12 md4></v-flex>
        <v-flex xs12 md10>
          <v-checkbox
            v-model="checkbox"
            :label="`Chọn để đăng ký làm người hướng dẫn`"
          ></v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-if="checkbox">
      <v-layout>
        <v-flex>
          <h4>Thành tích</h4>
        </v-flex>
        <v-flex xs12 md10>
          <v-textarea
            outline
            name="input-7-4"
            label="Giải thưởng"
            value
          ></v-textarea>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 md2>
          <h4>Giấy chứng nhận</h4>
        </v-flex>

        <v-flex xs12 md3>
          <v-sheet class="d-flex" color="#EEEEEE" height="200"></v-sheet>
          <div>
            <div class="large-12 medium-12 small-12 cell">
              <label>
                <input
                  id="file"
                  ref="file"
                  type="file"
                  @change="handleFileUpload()"
                />
              </label>
            </div>
          </div>
        </v-flex>
        <v-flex xs12 md3>
          <v-sheet class="d-flex" color="#EEEEEE" height="200"></v-sheet>
          <div>
            <div class="large-12 medium-12 small-12 cell">
              <label>
                <input
                  id="file"
                  ref="file"
                  type="file"
                  @change="handleFileUpload()"
                />
              </label>
            </div>
          </div>
        </v-flex>
        <v-flex xs12 md3>
          <v-sheet class="d-flex" color="#EEEEEE" height="200"></v-sheet>
          <div>
            <div class="large-12 medium-12 small-12 cell">
              <label>
                <input
                  id="file"
                  ref="file"
                  type="file"
                  @change="handleFileUpload()"
                />
              </label>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-flex>
      <v-btn class="mx-0 font-weight-light" color="success">Đồng ý</v-btn>
    </v-flex>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      checkbox: true,
      file: ''
    }
  },
  image: {
    chessLogo: require('@/assets/images/chess-logo.png')
  },

  methods: {
    submitFile() {
      let formData = new FormData()
      formData.append('file', this.file)

      this.axios
        .post('/single-file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(function() {
          console.log('SUCCESS!!')
        })
        .catch(function() {
          console.log('FAILURE!!')
        })
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    }
  }
}
</script>

<style scoped>
.flex {
  text-align: center;
}
.infogmail-layouts {
  height: 100%;
}
.h1 {
  text-align: center;
  color: brown;
  font-style: bold;
  height: 50px;
}
</style>
