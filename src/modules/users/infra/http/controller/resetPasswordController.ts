import ResetPasswordService from '@modules/users/services/ResetPasswordService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class resetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body
    const resetPasswordService = container.resolve(ResetPasswordService)
    await resetPasswordService.execute({ token, password })
    return res.status(204).json()
  }
}
export default resetPasswordController
