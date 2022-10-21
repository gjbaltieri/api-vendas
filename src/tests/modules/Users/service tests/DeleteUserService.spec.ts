import 'reflect-metadata'
import FakeUserRepository from '../fakeRepository/fakeUserRepository'
import AppError from '@shared/errors/AppError'
import CreateUserService from '@modules/users/services/CreateUserService'
import { IUser } from '@modules/users/domain/interfaces/models/IUser'
import DeleteUserService from '@modules/users/services/DeleteUserService'

let fakeUserRepository: FakeUserRepository
let deleteUserService: DeleteUserService
let createUserService: CreateUserService

let User: IUser

const FakeUser = {
  created_At: '2022-10-21T14:06:34.289Z',
  email: 'fakeemail@email.com',
  id: '649e4bcd-5665-49c9-9c23-4b15118c724c',
  name: 'Fake User',
  password: '$2a$08$t2QzYCdrH2KUdJdu.Zk3h..rQuXcEl/KW2fi2UgDrXmadPtp2Ytvq',
  updated_At: '2022-10-21T14:06:34.289Z',
}

describe('Delete User suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new FakeUserRepository()
    createUserService = new CreateUserService(fakeUserRepository)
    deleteUserService = new DeleteUserService(fakeUserRepository)
    User = (await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword',
    })) as IUser
  })
  it('should a delete one User', async () => {
    await deleteUserService.execute(User.id)
    const findAll = await fakeUserRepository.find()
    expect(findAll).toStrictEqual([])
  })
  it('should return user not found.', async () => {
    expect(deleteUserService.execute(FakeUser.id)).rejects.toBeInstanceOf(AppError)
  })
})
