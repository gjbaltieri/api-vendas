import UsersRepository from '@modules/users/typeorm/repository/UsersRepository'
import UserTokenRepository from '@modules/users/typeorm/repository/UserTokenRepository'
import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import EtherealMail from '@config/mail/EtheriumMail'
import path from 'path'

interface IRequest {
  email: string
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const templatePath = path.resolve(__dirname, '..', 'view', 'forgot_password.hbs')
    const userRepository = getCustomRepository(UsersRepository)
    const userTokenRepository = getCustomRepository(UserTokenRepository)
    const user = await userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User does not exists.')
    }
    const { token } = await userTokenRepository.generate(user.id)
    await EtherealMail.sendMail({
      to: {
        name: user.name,
        address: email,
      },
      subject: 'Troca de senha',
      templateData: {
        file: templatePath,
        variables: {
          name: user.name,
          link: 'localhost:8000/reset_password?token=' + token,
        },
      },
    })
  }
}

export default SendForgotPasswordEmailService
