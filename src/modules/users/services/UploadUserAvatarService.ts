import AppError from '@shared/errors/AppError'
import fs from 'fs'
import uploadConfig from '@config/Upload'
import path from 'path'
import { inject, injectable } from 'tsyringe'
import { IUpdateAvatar } from '../domain/interfaces/models/IUpdateAvatar'
import { IUser } from '../domain/interfaces/models/IUser'
import { IUserRepository } from '../domain/repository/IUserRepository'

@injectable()
class UpdateAvatarService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}
  public async execute({ user_id, avatar }: IUpdateAvatar): Promise<IUser> {
    const user = await this.userRepository.findById(user_id)
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
    await this.userRepository.save(user)
    return user
  }
}

export default UpdateAvatarService
