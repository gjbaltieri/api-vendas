import { Request, Response } from 'express'
import createUserService from '../infra/http/services/CreateUserService'
import deleteAllUserService from '../infra/http/services/DeleteAll'
import deleteUserService from '../infra/http/services/DeleteUserService'
import ListUserService from '../infra/http/services/ListUserService'

class UserController {
  public async listAll(req: Request, res: Response): Promise<Response> {
    const ListUsers = new ListUserService()
    const users = await ListUsers.execute()

    return res.json(users)
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body
    const createUser = new createUserService()
    const user = await createUser.execute({ name, email, password })

    return res.json(user)
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const deleteUser = new deleteUserService()
    await deleteUser.execute(id)

    return res.json([])
  }
  public async deleteAll(req: Request, res: Response): Promise<Response> {
    const deleteUser = new deleteAllUserService()
    const deleteAll = await deleteUser.execute()

    return res.json(deleteAll)
  }
}

export default UserController
