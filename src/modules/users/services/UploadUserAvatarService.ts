import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import User from '../typeorm/entities/User'
import fs from 'fs'
import uploadConfig from '@config/Upload'
import path from 'path'
import UsersRepository from '../typeorm/repository/UsersRepository'

interface IRequest {
  user_id: string
  avatar: string
}

class UpdateAvatarService {
  public async execute({ user_id, avatar }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository)

    const user = await userRepository.findById(user_id)
    if (!user) {
      throw new AppError('User not found.')
    }

    if (user.avatar) {
      console.log('aqui', uploadConfig.directory)

      const avatarPath = path.join(uploadConfig.directory, user.avatar)
      console.log('completo', avatarPath)
      const avatarExists = await fs.promises.stat(avatarPath)

      if (avatarExists) {
        await fs.promises.unlink(avatarPath)
      }
    }
    user.avatar = avatar
    await userRepository.save(user)
    return user
  }
}

export default UpdateAvatarService
