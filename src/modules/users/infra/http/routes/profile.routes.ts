import { Router } from 'express'
import UserController from '../controller/userController'
import { celebrate, Joi, Segments } from 'celebrate'
import multer from 'multer'
import uploadConfig from '@config/Upload'
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated'
import UserAvatarController from '../controller/userAvatarController'
import ProfileController from '../controller/profileController'

const profileController = new ProfileController()
const userAvatarController = new UserAvatarController()
const ProfileRoutes = Router()

const avatar = multer(uploadConfig)
ProfileRoutes.use(isAuthenticated)
ProfileRoutes.get('/', profileController.showProfile)
ProfileRoutes.put(
  '/update',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).optional(),
      passwordConfirmation: Joi.string().min(5).valid(Joi.ref('password')).when('password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      old_password: Joi.string().required(),
    },
  }),
  profileController.update,
)
ProfileRoutes.patch('/avatar', avatar.single('avatar'), userAvatarController.update)

export default ProfileRoutes
