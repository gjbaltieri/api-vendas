import UsersRepository from '@modules/users/typeorm/repository/UsersRepository'
import UserTokenRepository from '@modules/users/typeorm/repository/UserTokenRepository'
import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { addHours, isAfter } from 'date-fns'
import { hash } from 'bcryptjs'

interface IRequest {
  token: string
  password: string
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository)
    const userTokenRepository = getCustomRepository(UserTokenRepository)
    const userToken = await userTokenRepository.findByToken(token)
    if (!userToken) {
      throw new AppError('User Token does not exists or expired.')
    }
    const user = await userRepository.findById(userToken.user_id)
    if (!user) {
      throw new AppError('User does not exists.')
    }
    const tokenCreatedAt = userToken.created_At
    const addedHour = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), addedHour)) {
      throw new AppError('Token expired.')
    }
    user.password = await hash(password, 8)
    await userRepository.save(user)
    await userTokenRepository.remove(userToken)
  }
}

export default ResetPasswordService
