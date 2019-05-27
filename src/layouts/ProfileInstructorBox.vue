/<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <material-card class="v-card-profile">
        <v-avatar class="mx-auto d-block" size="130">
          <img src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg">
        </v-avatar>
        <v-card-text class="text-xs-center">
          <h4 class="category text-gray font-weight-thin mb-3">Instructor ChessOnline</h4>
        </v-card-text>
      </material-card>
      <v-flex xs10 md6>
        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 md12>
                <h2>Profile Instructor</h2>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  class="purple-input"
                  label="Tên tài khoản"
                  value="ChessOnline"
                  disabled
                />
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  label="Địa chỉ Email"
                  class="purple-input"
                  value="chessonline@gmail.com"
                  disabled
                />
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field label="Ngày sinh" class="purple-input" value="11/11/2011" disabled/>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field label="Họ và tên" class="purple-input" value/>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field label="Số điện thoại" class="purple-input" value/>
              </v-flex>
              <v-flex xs12 md12>
                <v-text-field label="Địa chỉ" class="purple-input" value/>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  class="purple-input"
                  label="Giới thiệu bản thân"
                  value="Là một người hòa đồng, thích du lịch"
                />
              </v-flex>
              <v-flex xs12 md12>
                <v-textarea outline name="input-7-4" label="Thành tích" value></v-textarea>
              </v-flex>
              <v-flex xs12 md12>
                <h4>Giấy chứng nhận</h4>
              </v-flex>

              <v-flex xs12 md5>
                <img height="150px" src="http://adminvn.violympic.vn/Images/imgpsh_fullsize.jpg">
              </v-flex>
              <v-flex xs12 md5>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfh7SKbC2sMGyx6GrI_ynzlg7M7HUk0yd2gU2LcUrs0idWu2Kr3A"
                  height="150px"
                >
              </v-flex>
              <v-flex xs12 text-xs-right>
                <v-btn class="mx-0 font-weight-light" color="success">Update Profile</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {}
</script>

<style>
</style>
