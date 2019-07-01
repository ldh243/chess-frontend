import CourseRepository from '@/repository/CourseRepository'
import UserRepository from '@/repository/UserRepository'

const repositories = {
  course: CourseRepository,
  user: UserRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
