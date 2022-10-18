import { Router } from 'express'
import UserController from '../controller/userController'
import { celebrate, Joi, Segments } from 'celebrate'
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated'
import ProfileController from '../controller/profileController'

const profileController = new ProfileController()
const userController = new UserController()
const UserRoutes = Router()

UserRoutes.get('/', isAuthenticated, userController.listAll)
UserRoutes.get('/profile', isAuthenticated, profileController.showProfile)
UserRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
    },
  }),
  userController.create,
)
UserRoutes.put(
  '/update',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
      passwordConfirmation: Joi.string().min(5).required().valid(Joi.ref('password')),
      old_password: Joi.string().required(),
    },
  }),
  profileController.update,
)
UserRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userController.delete,
)

export default UserRoutes
