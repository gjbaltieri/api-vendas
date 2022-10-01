import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import User from '../typeorm/entities/User'
import UserRepository from '../typeorm/repository/UsersRepository'

class ShowUserService {
  public async execute(id: string): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findOne(id)
    if (!user) {
      throw new AppError('User not found.')
    }
    return user
  }
}

export default ShowUserService
