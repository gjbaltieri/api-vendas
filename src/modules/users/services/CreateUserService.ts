import AppError from '@shared/errors/AppError'
import { hash } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import User from '../infra/typeorm/entities/User'
import UsersRepository from '../infra/typeorm/repository/UsersRepository'

interface IUser {
  name: string
  email: string
  password: string
}

class createUserService {
  public async execute({ name, email, password }: IUser): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository)
    const emailExists = await userRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email adress already used.')
    }
    const hashadPassword = await hash(password, 8)
    const createUser = userRepository.create({ name, email, password: hashadPassword })
    const user = await userRepository.save(createUser)

    return user
  }
}

export default createUserService
