import { Request, Response } from 'express'
import { container } from 'tsyringe'
import createUserService from '../../../services/CreateUserService'
import deleteUserService from '../../../services/DeleteUserService'
import ListUserService from '../../../services/ListUserService'

class UserController {
  public async listAll(req: Request, res: Response): Promise<Response> {
    const ListUsers = container.resolve(ListUserService)
    const users = await ListUsers.execute()

    return res.json(users)
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body
    const createUser = container.resolve(createUserService)
    const user = await createUser.execute({ name, email, password })

    return res.json(user)
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const deleteUser = container.resolve(deleteUserService)
    await deleteUser.execute(id)

    return res.json([])
  }
}

export default UserController
