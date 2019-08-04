import Repository from '@/repository/Repository'

const resource = '/learning-log'

export default {
  getLearningLog(courseId) {
    const data = {
      params: {
        courseId: courseId
      }
    }
    return Repository.get(
      `${resource}/get-current-user-learning-log-by-course-id`,
      data
    )
  },
  createLearningLog(courseId, lessonId) {
    const data = {
      courseId: courseId,
      lessonId: lessonId
    }
    return Repository.post(`${resource}/create-learning-log`, data)
  }
}
