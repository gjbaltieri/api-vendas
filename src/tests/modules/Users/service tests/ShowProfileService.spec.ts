import 'reflect-metadata'
import FakeUserRepository from '../fakeRepository/fakeUserRepository'
import AppError from '@shared/errors/AppError'
import CreateUserService from '@modules/users/services/CreateUserService'
import { IUser } from '@modules/users/domain/interfaces/models/IUser'
import ShowProfileService from '@modules/users/services/ShowProfileService'

let fakeUserRepository: FakeUserRepository
let createUserService: CreateUserService
let showProfileService: ShowProfileService
let User: IUser

describe('Create User suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new FakeUserRepository()
    createUserService = new CreateUserService(fakeUserRepository)
    showProfileService = new ShowProfileService(fakeUserRepository)
    User = (await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword',
    })) as IUser
  })
  it('should a show user Profile', async () => {
    const profile = await showProfileService.execute(User.id)
    expect(profile.id).toMatch(User.id)
  })
  it('should reject show user Profile (user not found.)', async () => {
    expect(showProfileService.execute('fakeID')).rejects.toBeInstanceOf(AppError)
  })
})
