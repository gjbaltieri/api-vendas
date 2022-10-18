import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IUser } from '../domain/interfaces/models/IUser'
import { IUserRepository } from '../domain/repository/IUserRepository'

@injectable()
class ShowUserService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}
  public async execute(id: string): Promise<IUser> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new AppError('User not found.')
    }
    return user
  }
}

export default ShowUserService
