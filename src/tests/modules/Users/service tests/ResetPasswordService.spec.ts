import 'reflect-metadata'
import 'dotenv/config'
import FakeUserRepository from '../fakeRepository/fakeUserRepository'
import AppError from '@shared/errors/AppError'
import { IUser } from '@modules/users/domain/interfaces/models/IUser'
import CreateUserService from '@modules/users/services/CreateUserService'
import FakeUserTokenRepository from '../fakeRepository/fakeUserTokenRepository'
import ResetPasswordService from '@modules/users/services/ResetPasswordService'
import { IUserToken } from '@modules/users/domain/interfaces/models/IUserToken'
import { subHours } from 'date-fns'

let fakeUserRepository: FakeUserRepository
let resetPasswordService: ResetPasswordService
let createUserService: CreateUserService
let userTokenRepository: FakeUserTokenRepository

let User: IUser
let UserToken: IUserToken

describe.only('Send forgot Password Email suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new FakeUserRepository()
    userTokenRepository = new FakeUserTokenRepository()
    resetPasswordService = new ResetPasswordService(fakeUserRepository, userTokenRepository)
    createUserService = new CreateUserService(fakeUserRepository)
    User = (await createUserService.execute({
      name: 'Fake user',
      email: 'fakeemail@email.com',
      password: 'fakepassword',
    })) as IUser
  })
  it('should reset a password', async () => {
    const UserToken = (await userTokenRepository.generate(User.id)) as IUserToken
    const resetPassword = await resetPasswordService.execute({
      token: UserToken.token,
      password: 'NewPassword',
    })
    expect(resetPassword).toBe(void 0)
  })
  it('should a reject reset password (invalid Token)', async () => {
    expect(
      resetPasswordService.execute({
        token: 'Invalid_Token',
        password: 'NewPassword',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should a reject reset password (invalid user_id)', async () => {
    const UserToken = (await userTokenRepository.generate(User.id)) as IUserToken
    UserToken.user_id = 'Invalid_user_id'
    expect(
      resetPasswordService.execute({
        token: UserToken.token,
        password: 'NewPassword',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
  it('should a reject reset password (token expires)', async () => {
    const UserToken = (await userTokenRepository.generate(User.id)) as IUserToken
    UserToken.created_At = subHours(Date.now(), 10)
    expect(
      resetPasswordService.execute({
        token: UserToken.token,
        password: 'NewPassword',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
