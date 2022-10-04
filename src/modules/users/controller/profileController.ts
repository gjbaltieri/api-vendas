import { Request, Response } from 'express'
import ShowUserService from '../services/ShowProfileService'
import UpdateUserService from '../services/UpdateUserService'

class ProfileController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const { name, email, password, old_password } = req.body

    const updateUser = new UpdateUserService()
    const user = await updateUser.execute({ id, name, email, password, old_password })

    return res.json(user)
  }
  public async showProfile(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const ListUser = new ShowUserService()
    const user = await ListUser.execute(id)

    return res.json(user)
  }
}

export default ProfileController
