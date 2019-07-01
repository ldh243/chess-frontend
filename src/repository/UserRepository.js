import Repository from '@/repository/Repository'

const resource = '/user'

export default {
  getCurrentUserDetail() {
    return Repository.get(`${resource}/get-current-user-detail`)
  }
}
