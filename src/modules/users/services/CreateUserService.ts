import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateUser } from '../domain/interfaces/models/ICreateUser'
import { IUser } from '../domain/interfaces/models/IUser'
import { IUserRepository } from '../domain/repository/IUserRepository'
import { IBCryptoHashProvider } from '../infra/providers/models/IBCryptoHashProvider'

@injectable()
class createUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('BCryptoHashProvider') private bCryptoHashProvider: IBCryptoHashProvider,
  ) {}
  public async execute({ name, email, password }: ICreateUser): Promise<ICreateUser> {
    const emailExists = await this.userRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email adress already used.')
    }
    const hashadPassword = await this.bCryptoHashProvider.generateHash(password)
    const user = await this.userRepository.create({ name, email, password: hashadPassword })

    return user
  }
}

export default createUserService
