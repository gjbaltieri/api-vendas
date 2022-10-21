// import { ICreateUser } from '@modules/users/domain/interfaces/models/ICreateUser'
// import { IUser } from '@modules/users/domain/interfaces/models/IUser'
// import { IUserRepository } from '@modules/users/domain/repository/IUserRepository'
// import User from '@modules/users/infra/typeorm/entities/User'
// import { randomUUID } from 'crypto'

// class FakeUsersRepository implements IUserRepository {
//   private Users: IUser[] = []

//   public async find(): Promise<IUser[]> {
//     const user = this.Users
//     return user
//   }
//   public async findByName(name: string): Promise<IUser | undefined> {
//     const user = this.Users.find(user => user.name === name)
//     return user
//   }
//   public async findById(id: string): Promise<IUser | undefined> {
//     const user = this.Users.find(user => user.id === id)
//     return user
//   }
//   public async findByEmail(email: string): Promise<IUser | undefined> {
//     const user = this.Users.find(user => user.email === email)
//     return user
//   }
//   public async create({ name, email, password }: ICreateUser): Promise<IUser> {
//     const user = new User()
//     user.id = randomUUID()
//     user.name = name
//     user.email = email
//     user.password = password
//     user.created_At = new Date()
//     user.updated_At = new Date()
//     this.Users.push(user)

//     return user
//   }
//   public async save(user: IUser): Promise<IUser> {
//     this.Users.push(user)
//     return user
//   }
//   public async remove(user: IUser): Promise<void> {
//     const userIndex = this.Users.findIndex(u => u.id === user.id)
//     this.Users.slice(userIndex)
//   }
// }

// export default FakeUsersRepository
