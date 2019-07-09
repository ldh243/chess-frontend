import Repository from '@/repository/Repository'

const resource = '/user'

export default {
  getCurrentUserDetail() {
    return Repository.get(`${resource}/get-current-user-detail`)
  },
  signUpNewAccount(data) {
    const user = JSON.parse(localStorage.getItem("user"))
    const newUser = {
      userId: user.userId,
      email: user.email,
      fullName: user.fullName,
      avatar: data.avatar == '' ? user.avatar : data.avatar,
      createdDate: user.createdDate,
      roleId: data.roleId,
      achievement: data.achievement,
      cetificates: data.cetificates,
      provider: user.provider,
      providerId: user.providerId,
      active: true
    } 
    console.log(newUser)
    return Repository.put(`${resource}/register`, newUser)
  }
}
