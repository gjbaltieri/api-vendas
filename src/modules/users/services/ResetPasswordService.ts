import AppError from '@shared/errors/AppError'
import { addHours, isAfter } from 'date-fns'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../domain/repository/IUserRepository'
import { IUserTokenRepository } from '../domain/repository/IUserTokenRepository'

interface IRequest {
  token: string
  password: string
}

injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UserRepository') private userTokenRepository: IUserTokenRepository,
  ) {}
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token)
    if (!userToken) {
      throw new AppError('User Token does not exists or expired.')
    }
    const user = await this.userRepository.findById(userToken.user_id)
    if (!user) {
      throw new AppError('User does not exists.')
    }
    const tokenCreatedAt = userToken.created_At
    const addedHour = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), addedHour)) {
      throw new AppError('Token expired.')
    }
    user.password = await hash(password, 8)
    await this.userRepository.save(user)
    await this.userTokenRepository.remove(userToken)
  }
}

export default ResetPasswordService
