import 'reflect-metadata'
import 'dotenv/config'
import FakeUserRepository from '../fakeRepository/fakeUserRepository'
import AppError from '@shared/errors/AppError'
import { IUser } from '@modules/users/domain/interfaces/models/IUser'
import CreateSessionService from '@modules/users/services/CreateSessionService'
import CreateUserService from '@modules/users/services/CreateUserService'

let fakeUserRepository: FakeUserRepository
let createSessionService: CreateSessionService
let createUserService: CreateUserService

let User: IUser

describe('Create User suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new FakeUserRepository()
    createSessionService = new CreateSessionService(fakeUserRepository)
    createUserService = new CreateUserService(fakeUserRepository)
    User = (await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword',
    })) as IUser
  })
  it('should a create a Session', async () => {
    const user = await createSessionService.execute({
      email: User.email,
      password: 'fakePassword',
    })
    expect(user).toHaveProperty('token')
  })
  it('should a reject create a Session (email invalid)', async () => {
    expect(
      createSessionService.execute({
        email: 'another_fake@email.com',
        password: 'fakePassword',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should a reject create a Session (password invalid)', async () => {
    const response = createSessionService.execute({
      email: 'fakeemail@email.com',
      password: 'another_fakePassword',
    })
    expect(response).rejects.toBeInstanceOf(AppError)
  })
})
