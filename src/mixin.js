import Vue from 'vue'
import firebase from 'firebase'
export default Vue.mixin({
  methods: {
    getCurrentPage() {
      return window.location.href
    },
    getTokenFromLocalStorage() {
      return localStorage.getItem('access-token')
    },
    // getStatusCourse(statusId) {
    //   switch (statusId) {
    //     case 1:
    //       return 'Đang soạn thảo'
    //     case 2:
    //       return 'Công khai'
    //     case 3:
    //       return 'Đã xóa'
    //     case 4:
    //       return 'Chờ duyệt'
    //     case 5:
    //       return 'Từ chối'
    //   }
    // },
    // getDateTimeFormat(datetime) {
    //   const date = new Date(Date.parse(datetime))
    //   return date.toLocaleString()
    // },
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
    getDateTimeFormat(datetime) {
      const date = new Date(Date.parse(datetime))
      return date.toLocaleString()
    },
    // changeChessKey(oldKey) {
    //   switch (oldKey.charAt(0)) {
    //     case 'R':
    //       return 'X' + oldKey.slice(1)
    //     case 'N':
    //       return 'M' + oldKey.slice(1)
    //     case 'B':
    //       return 'T' + oldKey.slice(1)
    //     case 'K':
    //       return 'V' + oldKey.slice(1)
    //     case 'Q':
    //       return 'H' + oldKey.slice(1)
    //     default:
    //       return oldKey
    //   }
    // }
    getLessonTypeName(lessonTypeId) {
      switch (lessonTypeId) {
        case 2:
          return 'Thực hành'
        case 3:
          return 'Lý thuyết'
      }
    },
    async uploadImageByDataURL(image, imageName, directory) {
      const uploadTask = firebase
        .storage()
        .ref(`images/${directory}/${imageName}`)
        .putString(image, 'data_url')
      // uploadTask.on('state_changed', () => {
      const imageLink = await firebase
        .storage()
        .ref(`images/${directory}`)
        .child(`${imageName}`)
        .getDownloadURL()
        .then(url => {
          return url
        })
      return imageLink
      // })
    },
    isEmpty(obj) {
      if (obj !== null && obj !== undefined) {
        return false
      }
      return true
    }
  }
})
