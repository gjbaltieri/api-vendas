import { Request, Response } from 'express'
import createUserService from '../services/CreateUserService'
import deleteAllUserService from '../services/DeleteAll'
import deleteUserService from '../services/DeleteUserService'
import ListUserService from '../services/ListUserService'
import ShowUserService from '../services/ShowUserService'
import UpdateUserService from '../services/UpdateUserService'

class UserController {
  public async listAll(req: Request, res: Response): Promise<Response> {
    const ListUsers = new ListUserService()
    const users = await ListUsers.execute()

    return res.json(users)
  }

  public async listOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const ListUser = new ShowUserService()
    const user = await ListUser.execute(id)

    return res.json(user)
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body
    const createUser = new createUserService()
    const user = await createUser.execute({ name, email, password })

    return res.json(user)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email, password } = req.body

    const updateUser = new UpdateUserService()
    const user = await updateUser.execute(id, { name, email, password })

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
