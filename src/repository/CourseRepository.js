import Repository from '@/repository/Repository'

const resource = '/course'

export default {
  getCoursesPagination(page, pageSize, statusId) {
    const data = {
      params: {
        page: page,
        pageSize: pageSize,
        statusId: statusId
      }
    }

    return Repository.get(`${resource}/get-course-pagination`, data)
  },
  getById(courseId) {
    const data = {
      params: {
        courseId: courseId
      }
    }
    return Repository.get(`${resource}/get-by-id`, data)
  },
  enrollCourse(courseId) {
    const data = {
      courseId: courseId
    }
    return Repository.post(`${resource}/enroll`, data)
  }
}
