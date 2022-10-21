import 'reflect-metadata'
import 'dotenv/config'
import FakeUserRepository from '../fakeRepository/fakeUserRepository'
import AppError from '@shared/errors/AppError'
import { IUser } from '@modules/users/domain/interfaces/models/IUser'
import CreateUserService from '@modules/users/services/CreateUserService'
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService'
import UserTokenRepository from '@modules/users/infra/typeorm/repository/UserTokenRepository'
import FakeUserTokenRepository from '../fakeRepository/fakeUserTokenRepository'

let fakeUserRepository: FakeUserRepository
let sendForgotPasswordEmailService: SendForgotPasswordEmailService
let createUserService: CreateUserService
let userTokenRepository: FakeUserTokenRepository

let User: IUser

describe('Send forgot Password Email suite tests', () => {
  jest.setTimeout(60000)
  beforeAll(async () => {
    fakeUserRepository = new FakeUserRepository()
    userTokenRepository = new FakeUserTokenRepository()
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(fakeUserRepository, userTokenRepository)
    createUserService = new CreateUserService(fakeUserRepository)
    User = (await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword',
    })) as IUser
  })
  it('should send a email', async () => {
    const sendEmail = await sendForgotPasswordEmailService.execute({
      email: User.email,
    })
    console.log('send email', sendEmail)
    expect(sendEmail).toBe(true)
  })
  it('should a reject create a send Email (user not found.)', async () => {
    expect(
      sendForgotPasswordEmailService.execute({
        email: 'Fake_id',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
