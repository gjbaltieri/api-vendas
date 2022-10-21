import AppError from '@shared/errors/AppError'
import EtherealMail from '@config/mail/EtheriumMail'
import path from 'path'
import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../domain/repository/IUserRepository'
import { IUserTokenRepository } from '../domain/repository/IUserTokenRepository'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('UserRepository') private userTokenRepository: IUserTokenRepository,
  ) {}
  public async execute({ email }: IRequest): Promise<Boolean> {
    const templatePath = path.resolve(__dirname, '..', 'view', 'forgot_password.hbs')
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('User does not exists.')
    }
    const { token } = await this.userTokenRepository.generate(user.id)
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
          link: `${process.env.API_WEB_URL}/reset_password?token=${token}`,
        },
      },
    })
    return true
  }
}

export default SendForgotPasswordEmailService
