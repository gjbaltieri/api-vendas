import 'reflect-metadata'
import FakeUserRepository from '../fakeRepository/fakeUserRepository'
import AppError from '@shared/errors/AppError'
import CreateUserService from '@modules/users/services/CreateUserService'
import { IUser } from '@modules/users/domain/interfaces/models/IUser'

let fakeUserRepository: FakeUserRepository
let createUserService: CreateUserService

let User: IUser

describe('Create User suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new FakeUserRepository()
    createUserService = new CreateUserService(fakeUserRepository)
    User = (await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword',
    })) as IUser
  })
  it('should a create one User', async () => {
    const user = await createUserService.execute({
      name: 'Fake User',
      email: 'email@email.com',
      password: 'fake password',
    })
    expect(user).toHaveProperty('id')
  })
  it('should return email adress already used.', async () => {
    expect(
      createUserService.execute({
        name: 'Fake User',
        email: 'fakeemail@email.com',
        password: 'fake password',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
