import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import UserRepository from '../infra/typeorm/repository/UsersRepository'
import { compare, compareSync, hash } from 'bcryptjs'
import { IUpdateUser } from '../domain/interfaces/models/IUpdateUser'
import { IUser } from '../domain/interfaces/models/IUser'
import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../domain/repository/IUserRepository'

@injectable()
class UpdateUserService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}
  public async execute({ id, name, email, password, old_password }: IUpdateUser): Promise<IUser> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new AppError('User not found.')
    }
    const emailExists = await this.userRepository.findByEmail(email)
    if (emailExists && emailExists.id !== id) {
      throw new AppError('There is already one user with this email')
    }
    if (password && !old_password) {
      throw new AppError('Current password is required')
    }
    if (password && old_password) {
      const checkPassword = compareSync(old_password, user.password)
      if (!checkPassword) {
        throw new AppError('Current password does not match.')
      }
      user.password = await hash(password, 8)
    }
    user.name = name
    user.email = email

    const newUser = await this.userRepository.save(user)
    return newUser
  }
}
export default UpdateUserService
