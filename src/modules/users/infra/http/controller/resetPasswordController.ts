import { Request, Response } from 'express'
import ResetPasswordService from '../../../services/ResetPasswordService'

class resetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body
    const resetPasswordService = new ResetPasswordService()
    await resetPasswordService.execute({ token, password })
    return res.status(204).json()
  }
}
export default resetPasswordController