import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import UserRepository from '../infra/typeorm/repository/UsersRepository'

class deleteUserService {
  public async execute(id: string): Promise<void> {
    const userRepository = getCustomRepository(UserRepository)
    const userExists = await userRepository.findOne(id)
    if (!userExists) {
      throw new AppError('User not found.')
    }
    await userRepository.remove(userExists)
  }
}

export default deleteUserService
