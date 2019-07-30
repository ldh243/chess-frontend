import CourseRepository from '@/repository/CourseRepository'
import UserRepository from '@/repository/UserRepository'
import LessonRepository from '@/repository/LessonRepository'
import CategoryRepository from '@/repository/CategoryRepository'

const repositories = {
  course: CourseRepository,
  user: UserRepository,
  lesson: LessonRepository,
  category: CategoryRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
