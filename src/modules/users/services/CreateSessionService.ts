import AppError from '@shared/errors/AppError'
import { compare } from 'bcryptjs'
import AuthConfig from '@config/AuthConfig'
import { getCustomRepository } from 'typeorm'
import User from '../typeorm/entities/User'
import UsersRepository from '../typeorm/repository/UsersRepository'
import { sign } from 'jsonwebtoken'

interface Isession {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

class createSessionService {
  public async execute({ email, password }: Isession): Promise<IResponse> {
    const userRepository = getCustomRepository(UsersRepository)
    const user = await userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Invalid email or password.', 401)
    }

    const unhashPassword = await compare(password, user.password)
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
