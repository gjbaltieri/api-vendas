import 'reflect-metadata'
import FakeUserRepository from '../fakeRepository/fakeUserRepository'
import AppError from '@shared/errors/AppError'
import CreateUserService from '@modules/users/services/CreateUserService'
import { IUser } from '@modules/users/domain/interfaces/models/IUser'
import UpdateUserService from '@modules/users/services/UpdateUserService'
import { IUpdateUser } from '@modules/users/domain/interfaces/models/IUpdateUser'

let fakeUserRepository: FakeUserRepository
let createUserService: CreateUserService
let updateUserService: UpdateUserService
let User: IUser

describe('Create User suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new FakeUserRepository()
    createUserService = new CreateUserService(fakeUserRepository)
    updateUserService = new UpdateUserService(fakeUserRepository)
    User = (await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword',
    })) as IUser
    await createUserService.execute({
      name: 'Fake User',
      email: 'fake@email.com',
      password: 'fakePassword',
    })
  })
  it('should a update one User', async () => {
    const updateUser = {
      id: User.id,
      name: 'New Name',
      email: User.email,
      password: User.password,
      old_password: 'fakePassword',
    }
    const user = await updateUserService.execute(updateUser)
    expect(user.name).toEqual(User.name)
  })
  it('should a reject update one User (User not found)', async () => {
    const updateUser = {
      id: 'FakeID',
      name: 'New Name',
      email: User.email,
      password: User.password,
      old_password: 'fakePassword',
    }
    expect(updateUserService.execute(updateUser)).rejects.toBeInstanceOf(AppError)
  })
  it('should a reject update one User (old_password does not match)', async () => {
    const updateUser = {
      id: User.id,
      name: 'New Name',
      email: User.email,
      password: 'new Password',
      old_password: 'another_old_password',
    }
    const newUser = updateUserService.execute(updateUser)
    expect(newUser).rejects.toBeInstanceOf(AppError)
  })
  it('should a reject update one User (email is already used)', async () => {
    const updateUser = {
      id: User.id,
      name: 'New Name',
      email: 'fake@email.com',
      password: User.password,
      old_password: 'fakePassword',
    }
    expect(updateUserService.execute(updateUser)).rejects.toBeInstanceOf(AppError)
  })
  it('should a reject update one User (old_password not provid)', async () => {
    const updateUser = {
      id: User.id,
      name: 'New Name',
      email: User.email,
      password: User.password,
    }
    expect(updateUserService.execute(updateUser as IUpdateUser)).rejects.toBeInstanceOf(AppError)
  })
})
