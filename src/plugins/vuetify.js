import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@/assets/style/global.styl'
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
  iconfont: 'mdi' || 'fa'
})
