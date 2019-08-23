import Repository from '@/repository/Repository'

const resource = '/user'

export default {
  getCurrentUserDetail() {
    return Repository.get(`${resource}/get-current-user-detail`)
  },
  signUpNewAccount(newUser) {
    return Repository.put(`${resource}/register`, newUser)
  },
  updateProfile(newUser) {
    return Repository.put(`${resource}/update-profile`, newUser)
  },
  getById(userId) {
    const data = {
      params: {
        userId: userId
      }
    }
    return Repository.get(`${resource}/get-by-id`, data)
  }
}
