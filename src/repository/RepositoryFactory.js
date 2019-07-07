import CourseRepository from '@/repository/CourseRepository'
import UserRepository from '@/repository/UserRepository'
import LessonRepository from '@/repository/LessonRepository'

const repositories = {
  course: CourseRepository,
  user: UserRepository,
  lesson: LessonRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
