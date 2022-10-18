import { inject, injectable } from 'tsyringe'
import { getCustomRepository } from 'typeorm'
import { IUserRepository } from '../domain/repository/IUserRepository'
import User from '../infra/typeorm/entities/User'

@injectable()
class ListUserService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}
  public async execute(): Promise<User[]> {
    const users = await this.userRepository.find()
    return users
  }
}

export default ListUserService
