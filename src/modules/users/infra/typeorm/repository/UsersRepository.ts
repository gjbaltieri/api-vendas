import { ICreateUser } from '@modules/users/domain/interfaces/models/ICreateUser'
import { IUser } from '@modules/users/domain/interfaces/models/IUser'
import { IUserId } from '@modules/users/domain/interfaces/models/IUserId'
import { IUserRepository } from '@modules/users/domain/repository/IUserRepository'
import { getRepository, Repository } from 'typeorm'
import User from '../entities/User'

class UsersRepository implements IUserRepository {
  private orm: Repository<User>
  constructor() {
    this.orm = getRepository(User)
  }
  public async find(): Promise<IUser[]> {
    const user = await this.orm.find()
    return user
  }
  public async findByName(name: string): Promise<IUser | undefined> {
    const user = await this.orm.findOne({
      where: {
        name,
      },
    })
    return user
  }
  public async findById(id: string): Promise<IUser | undefined> {
    const user = await this.orm.findOne({
      where: {
        id,
      },
    })
    return user
  }
  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.orm.findOne({
      where: {
        email,
      },
    })
    return user
  }
  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = this.orm.create({ name, email, password })
    await this.orm.save(user)
    return user
  }
  public async save(user: IUser): Promise<IUser> {
    await this.orm.save(user)
    return user
  }
  public async remove(user: IUser): Promise<void> {
    this.orm.remove(user)
  }
}

export default UsersRepository
