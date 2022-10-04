import { Router } from 'express'
import Joi from 'joi'
import { celebrate, Segments } from 'celebrate'
import customerController from '../controller/customerController'

const CustomerRoutes = Router()
const customer = new customerController()

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
CustomerRoutes.post('/', customer.create)
CustomerRoutes.put(
  '/update/:id',
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
