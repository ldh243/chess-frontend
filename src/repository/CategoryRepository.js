import Repository from '@/repository/Repository'

const resource = '/category'

export default {
  getCategories() {
    return Repository.get(`${resource}/get-categories`)
  }
}
