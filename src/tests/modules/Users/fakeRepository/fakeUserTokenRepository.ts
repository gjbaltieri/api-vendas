import { IUserToken } from '@modules/users/domain/interfaces/models/IUserToken'
import { IUserTokenRepository } from '@modules/users/domain/repository/IUserTokenRepository'
import UserToken from '@modules/users/infra/typeorm/entities/UserToken'
import { randomUUID } from 'crypto'

class FakeUserTokenRepository implements IUserTokenRepository {
  private orm: UserToken[] = []
  public async findByToken(token: string): Promise<IUserToken | undefined> {
    const userToken = this.orm.find(uToken => uToken.token === token)
    return userToken
  }
  public async generate(user_id: string): Promise<IUserToken> {
    const userToken = new UserToken()
    userToken.id = randomUUID()
    userToken.token = randomUUID()
    userToken.user_id = user_id
    userToken.created_At = new Date()
    userToken.updated_At = new Date()
    this.orm.push(userToken)
    return userToken
  }
  public async remove(userToken: IUserToken): Promise<void> {
    const token = this.orm.findIndex(uToken => uToken === userToken)
    this.orm.splice(token)
  }
}

export default FakeUserTokenRepository
