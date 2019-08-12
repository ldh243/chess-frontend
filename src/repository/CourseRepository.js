import Repository from '@/repository/Repository'

const resource = '/course'

export default {
  getCoursesPagination(searchParams) {
    const data = {
      params: searchParams
    }
    return Repository.get(`${resource}/get-course-pagination`, data)
  },
  getCoursesPaginationsByUserId(searchParams) {
    const data = {
      params: searchParams
    }
    return Repository.get(`${resource}/get-course-paginations-by-userid`, data)
  },
  getCoursesPaginationByCategoryId(searchParams) {
    const data = {
      params: searchParams
    }
    return Repository.get(
      `${resource}/get-course-paginations-by-category-id`,
      data
    )
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
  },
  getReviewPagination(courseId, page, pageSize) {
    const data = {
      params: {
        courseId: courseId,
        page: page,
        pageSize: pageSize
      }
    }
    return Repository.get(`${resource}/get-review-pagination`, data)
  },
  getCourseOverview(courseId) {
    const data = {
      params: {
        courseId: courseId
      }
    }
    return Repository.get(`${resource}/get-course-overview`, data)
  },
  createReview(newReview) {
    const data = newReview
    return Repository.post(`${resource}/create-review`, data)
  },
  updateReview(updatedReview) {
    const data = updatedReview
    return Repository.put(`${resource}/update-review`, data)
  },
  removeReview(courseId, reviewId) {
    const data = {
      courseId: courseId,
      reviewId: reviewId
    }
    return Repository.put(`${resource}/remove-review`, data)
  }
}
