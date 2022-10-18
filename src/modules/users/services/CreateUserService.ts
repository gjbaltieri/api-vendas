import AppError from '@shared/errors/AppError'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { getCustomRepository } from 'typeorm'
import { IUserRepository } from '../domain/repository/IUserRepository'
import User from '../infra/typeorm/entities/User'
import UsersRepository from '../infra/typeorm/repository/UsersRepository'

interface IUser {
  name: string
  email: string
  password: string
}

@injectable()
class createUserService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}
  public async execute({ name, email, password }: IUser): Promise<IUser> {
    const emailExists = await this.userRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email adress already used.')
    }
    const hashadPassword = await hash(password, 8)
    const user = await this.userRepository.create({ name, email, password: hashadPassword })

    return user
  }
}

export default createUserService
