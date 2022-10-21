import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../domain/repository/IUserRepository'

@injectable()
class deleteUserService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}
  public async execute(id: string): Promise<void> {
    const userExists = await this.userRepository.findById(id)
    if (!userExists) {
      throw new AppError('User not found.')
    }
    await this.userRepository.remove(userExists)
  }
}

export default deleteUserService
