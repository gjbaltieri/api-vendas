import { Router } from 'express'
import UserController from '../controller/userController'
import { celebrate, Joi, Segments } from 'celebrate'
import multer from 'multer'
import uploadConfig from '@config/Upload'
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated'
import UserAvatarController from '../controller/userAvatarController'

const userController = new UserController()
const userAvatarController = new UserAvatarController()
const UserRoutes = Router()

const avatar = multer(uploadConfig)

UserRoutes.get('/', isAuthenticated, userController.listAll)
UserRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  userController.listOne,
)
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
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
    },
  }),
  userController.update,
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
UserRoutes.delete('/', userController.deleteAll)

UserRoutes.patch('/avatar', isAuthenticated, avatar.single('avatar'), userAvatarController.update)

export default UserRoutes
