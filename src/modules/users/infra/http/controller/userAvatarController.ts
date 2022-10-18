import { Request, Response } from 'express'
import { container } from 'tsyringe'
import UpdateAvatarService from '../../../services/UploadUserAvatarService'

class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const avatarService = container.resolve(UpdateAvatarService)

    const user = await avatarService.execute({
      user_id: req.user.id,
      avatar: req.file.filename,
    })
    return res.json(user)
  }
}

export default UserAvatarController
