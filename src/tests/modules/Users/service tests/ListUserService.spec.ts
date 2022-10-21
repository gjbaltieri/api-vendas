import 'reflect-metadata'
import FakeUserRepository from '../fakeRepository/fakeUserRepository'
import AppError from '@shared/errors/AppError'
import CreateUserService from '@modules/users/services/CreateUserService'
import { IUser } from '@modules/users/domain/interfaces/models/IUser'
import ListUserService from '@modules/users/services/ListUserService'

let fakeUserRepository: FakeUserRepository
let createUserService: CreateUserService
let listUserService: ListUserService

describe('Create User suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new FakeUserRepository()
    createUserService = new CreateUserService(fakeUserRepository)
    listUserService = new ListUserService(fakeUserRepository)
    ;(await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword',
    })) as IUser
  })
  it('should a return all Users', async () => {
    const user = await listUserService.execute()
    expect(user.length >= 1)
  })
})
