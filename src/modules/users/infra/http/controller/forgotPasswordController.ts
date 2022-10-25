import { Request, Response } from 'express'
import { container } from 'tsyringe'
import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService'

class forgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body
    const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailService)
    const emailResponse = await sendForgotPasswordEmail.execute({ email })
    return res.status(200).json(emailResponse)
  }
}
export default forgotPasswordController
