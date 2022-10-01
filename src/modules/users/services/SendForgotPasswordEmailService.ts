import UsersRepository from '@modules/users/typeorm/repository/UsersRepository'
import UserTokenRepository from '@modules/users/typeorm/repository/UserTokenRepository'
import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import EtherealMail from '@config/mail/EtheriumMail'

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
    await EtherealMail.sendMail({
      to: email,
      body: `Olá ${user.name},
      Aqui está seu token para redefinição da senha: ${userToken?.token}`,
    })
  }
}

export default SendForgotPasswordEmailService
