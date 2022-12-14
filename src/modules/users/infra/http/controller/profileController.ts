import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ShowUserService from '../../../services/ShowProfileService'
import UpdateUserService from '../../../services/UpdateUserService'

class ProfileController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const { name, email, password, old_password } = req.body

    const updateUser = container.resolve(UpdateUserService)
    const user = await updateUser.execute({ id, name, email, password, old_password })

    return res.json(user)
  }
  public async showProfile(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const ListUser = container.resolve(ShowUserService)
    const user = await ListUser.execute(id)
    return res.json(user)
  }
}

export default ProfileController
