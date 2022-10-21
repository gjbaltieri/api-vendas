import 'reflect-metadata'
import FakeUserRepository from '../fakeRepository/fakeUserRepository'
import AppError from '@shared/errors/AppError'
import CreateUserService from '@modules/users/services/CreateUserService'
import { IUser } from '@modules/users/domain/interfaces/models/IUser'
import UploadUserAvatarService from '@modules/users/services/UploadUserAvatarService'
import fs from 'fs'
import path from 'path'

let fakeUserRepository: FakeUserRepository
let createUserService: CreateUserService
let uploadUserAvatarService: UploadUserAvatarService
let User: IUser
let UserWithAvatar: IUser

describe('Create User suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new FakeUserRepository()
    createUserService = new CreateUserService(fakeUserRepository)
    uploadUserAvatarService = new UploadUserAvatarService(fakeUserRepository)
    User = (await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword',
    })) as IUser
    UserWithAvatar = (await createUserService.execute({
      name: 'Fake User',
      email: 'anotherfake@email.com',
      password: 'fakePassword',
    })) as IUser
    await uploadUserAvatarService.execute({ user_id: UserWithAvatar.id, avatar: 'file_name.jpg' })
    fs.promises.writeFile(path.join(__dirname, '../../../../../uploads/file_name.jpg'), 'imageupload')
  })
  it('should a upload user Avatar', async () => {
    const profile = await uploadUserAvatarService.execute({ user_id: User.id, avatar: 'file_name.jpg' })
    expect(profile.avatar).not.toEqual(null)
  })
  it('should reject upload user Avatar (user not found.)', async () => {
    expect(uploadUserAvatarService.execute({ user_id: 'FakeID', avatar: 'file_name.jpg' })).rejects.toBeInstanceOf(
      AppError,
    )
  })
  it('should change user Avatar', async () => {
    const changeUserAvatar = await uploadUserAvatarService.execute({
      user_id: UserWithAvatar.id,
      avatar: 'new_file_name.jpg',
    })
    expect(changeUserAvatar.avatar).toEqual('new_file_name.jpg')
  })
})
