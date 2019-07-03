import Repository from '@/repository/Repository'

const resource = '/lesson'

export default {
  getById(lessonId) {
    const data = {
      params: {
        lessonId: lessonId
      }
    }
    return Repository.get(`${resource}/get-by-id`, data)
  }
}
