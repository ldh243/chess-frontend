import Repository, { setAuthorizationHeader } from '@/repository/Repository'

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
      fullName: data.fullName == '' ? user.fullName : data.fullName,
      avatar: data.avatar == '' ? user.avatar : data.avatar,
      createdDate: user.createdDate,
      roleId: data.roleId,
      achievement: data.achievement,
      certificates: data.certificates,
      provider: user.provider,
      providerId: user.providerId,
      active: true,
      status: data.status,
      roleName: data.roleName
    } 
    return Repository.put(`${resource}/register`, newUser).then(() => {
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify(newUser))
      localStorage.removeItem('role')
      localStorage.setItem('role', newUser.roleId)
    })
  }
}
