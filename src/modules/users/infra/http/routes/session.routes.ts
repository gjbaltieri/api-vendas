import { celebrate, Segments } from 'celebrate'
import { Router } from 'express'
import Joi from 'joi'
import SessionController from '../controller/sessionsController'

const sessionRouter = Router()
const sessionController = new SessionController()

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
)

export default sessionRouter
