import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import User from '../typeorm/entities/User'
import UserRepository from '../typeorm/repository/UsersRepository'

interface Iuser {
  name: string
  email: string
  password: string
}

class UpdateUserService {
  public async execute(id: string, { name, email, password }: Iuser): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findOne(id)
    if (!user) {
      throw new AppError('User not found.')
    }
    const emailExists = await userRepository.findByEmail(email)
    if (emailExists && email !== user.email) {
      throw new AppError('There is already one user with this email')
    }
    user.name = name
    user.email = email
    user.password = password

    const newUser = await userRepository.save(user)
    return newUser
  }
}
export default UpdateUserService
