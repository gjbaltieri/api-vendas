import { celebrate, Segments } from 'celebrate'
import { Router } from 'express'
import Joi from 'joi'
import forgotPasswordController from '../../../controller/forgotPasswordController'
import resetPasswordController from '../../../controller/resetPasswordController'

const passwordRouter = Router()
const forgotPassword = new forgotPasswordController()
const resetPassword = new resetPasswordController()

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPassword.create,
)
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPassword.create,
)

export default passwordRouter
