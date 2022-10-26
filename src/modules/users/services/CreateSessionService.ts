import AppError from '@shared/errors/AppError'
import AuthConfig from '@config/AuthConfig'
import { sign } from 'jsonwebtoken'
import { ISessionResponse } from '../domain/interfaces/models/ISessionResponse'
import { ISession } from '../domain/interfaces/models/ISession'
import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../domain/repository/IUserRepository'
import { IBCryptoHashProvider } from '../infra/providers/models/IBCryptoHashProvider'

@injectable()
class createSessionService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('BCryptoHashProvider') private bCryptoHashProvider: IBCryptoHashProvider,
  ) {}
  public async execute({ email, password }: ISession): Promise<ISessionResponse> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Invalid email or password.', 401)
    }

    const unhashPassword = this.bCryptoHashProvider.compareHash(password, user.password)
    if (!unhashPassword) {
      throw new AppError('Invalid email or password.', 401)
    }
    const token = sign({}, AuthConfig.jwt.secret, {
      subject: user.id,
      expiresIn: AuthConfig.jwt.expiresIn,
    })
    return { user, token }
  }
}

export default createSessionService
