import { ICreateUser } from '../interfaces/models/ICreateUser'
import { IUser } from '../interfaces/models/IUser'
import { IUserId } from '../interfaces/models/IUserId'

export interface IUserRepository {
  find(): Promise<IUser[]>
  findByName(name: string): Promise<IUser | undefined>
  findById(id: string): Promise<IUser | undefined>
  findByEmail(email: string): Promise<IUser | undefined>
  create({ name, email, password }: ICreateUser): Promise<IUser>
  remove(data: IUser): Promise<void>
  save(data: IUser): Promise<IUser>
}
