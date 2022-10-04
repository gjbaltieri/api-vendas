import { Router } from 'express'
import Joi from 'joi'
import { celebrate, Segments } from 'celebrate'
import customerController from '../controller/customerController'
import isAuthenticated from '@shared/http/middlewares/isAuthenticated'

const CustomerRoutes = Router()
const customer = new customerController()

CustomerRoutes.use(isAuthenticated)
CustomerRoutes.get('/', customer.listAll)
CustomerRoutes.get(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customer.listOne,
)
CustomerRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customer.create,
)
CustomerRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customer.update,
)
CustomerRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customer.delete,
)

export default CustomerRoutes
