import Vue from 'vue'
const axios = require('axios')
export default Vue.mixin({
  methods: {
    async callAxios(method, url, params) {
      //get token from localStorage
      var token = this.getTokenFromLocalStorage()

      axios.interceptors.response.use(
        function(response) {
          return response
        },
        function(error) {
          if (
            error.response.status &&
            (error.response.status === 403 || error.response.status === 401)
          ) {
            localStorage.removeItem('access-token')
            localStorage.removeItem('user')
            window.location.reload()
          }
        }
      )

      //set config for axios
      let config = {
        method: method,
        url: url,
        params: params,
        headers: {
          Authorization: 'Chess ' + token
        }
      }
      return await axios(config)
    },

    getCurrentPage() {
      return window.location.href
    },
    getTokenFromLocalStorage() {
      return localStorage.getItem('access-token')
    },
    getStatusCourse(statusId) {
      switch (statusId) {
        case 1:
          return 'Đang soạn thảo'
        case 2:
          return 'Công khai'
        case 3:
          return 'Đã xóa'
        case 4:
          return 'Chờ duyệt'
        case 5:
          return 'Từ chối'
      }
    },
    getDateTimeFormat(datetime) {
      const date = new Date(Date.parse(datetime))
      return date.toLocaleString()
    },
    formatListCourse(courses) {
      courses.forEach(course => {
        course.statusName = this.getStatusCourse(course.statusId)
        course.courseCreatedDate = this.getDateTimeFormat(
          course.courseCreatedDate
        )
      })
      return courses
    },
    getRoleName(roleId) {
      switch (roleId) {
        case 1:
          return 'Người hướng dẫn'
        case 2:
          return 'Người học'
        case 3:
          return 'Quản trị viên'
        case 4:
          return 'Thành viên mới'
      }
    },
    getStatusUser(active) {
      if (active) {
        return 'Kích hoạt'
      } else {
        return 'Vô hiệu hóa'
      }
    },
    changeChessKey(oldKey) {
      switch (oldKey.charAt(0)) {
        case 'R':
          return 'X' + oldKey.slice(1)
        case 'N':
          return 'M' + oldKey.slice(1)
        case 'B':
          return 'T' + oldKey.slice(1)
        case 'K':
          return 'V' + oldKey.slice(1)
        case 'Q':
          return 'H' + oldKey.slice(1)
        default:
          return oldKey
      }
    }
  }
})
