import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import User from '../infra/typeorm/entities/User'
import UserRepository from '../infra/typeorm/repository/UsersRepository'
import { compare, hash } from 'bcryptjs'

interface IRequest {
  id: string
  name: string
  email: string
  password: string
  old_password: string
}

class UpdateUserService {
  public async execute({ id, name, email, password, old_password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findById(id)
    if (!user) {
      throw new AppError('User not found.')
    }
    const emailExists = await userRepository.findByEmail(email)
    if (emailExists && emailExists.id !== id) {
      throw new AppError('There is already one user with this email')
    }

    if (password && !old_password) {
      throw new AppError('Current password is required')
    }
    if (password === old_password) {
      throw new AppError('The new password must be different from the current one.')
    }
    if (password && old_password) {
      const checkPassword = await compare(old_password, user.password)
      if (!checkPassword) {
        throw new AppError('Current password does not match.')
      }
      user.password = await hash(password, 8)
    }
    user.name = name
    user.email = email

    const newUser = await userRepository.save(user)
    return newUser
  }
}
export default UpdateUserService
