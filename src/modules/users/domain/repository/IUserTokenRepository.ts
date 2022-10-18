import { IUserToken } from '../interfaces/models/IUserToken'

export interface IUserTokenRepository {
  findByToken(token: string): Promise<IUserToken | undefined>
  generate(user_id: string): Promise<IUserToken>
  remove(user: IUserToken): Promise<void>
}
