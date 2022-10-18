import { IUserToken } from '@modules/users/domain/interfaces/models/IUserToken'
import { IUserTokenRepository } from '@modules/users/domain/repository/IUserTokenRepository'
import { getRepository, Repository } from 'typeorm'
import UserToken from '../entities/UserToken'

class UserTokenRepository implements IUserTokenRepository {
  private orm: Repository<IUserToken>
  constructor() {
    this.orm = getRepository(UserToken)
  }
  public async findByToken(token: string): Promise<IUserToken | undefined> {
    const userToken = await this.orm.findOne({
      where: {
        token,
      },
    })
    return userToken
  }
  public async generate(user_id: string): Promise<IUserToken> {
    const userToken = this.orm.create({
      user_id,
    })
    await this.orm.save(userToken)

    return userToken
  }
  public async remove(userToken: IUserToken): Promise<void> {
    await this.orm.remove(userToken)
  }
}

export default UserTokenRepository
