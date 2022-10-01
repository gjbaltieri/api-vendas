import UsersRepository from '@modules/users/typeorm/repository/UsersRepository'
import UserTokenRepository from '@modules/users/typeorm/repository/UserTokenRepository'
import AppError from '@shared/errors/AppError'
import { addHours } from 'date-fns'
import { getCustomRepository } from 'typeorm'

interface IRequest {
  email: string
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository)
    const userTokenRepository = getCustomRepository(UserTokenRepository)
    const user = await userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User does not exists.')
    }
    const userToken = await userTokenRepository.generate(user.id)
    console.log(userToken)
  }
}

export default SendForgotPasswordEmailService
