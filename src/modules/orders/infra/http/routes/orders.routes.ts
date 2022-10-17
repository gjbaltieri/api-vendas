import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated'
import { celebrate, Segments } from 'celebrate'
import { Router } from 'express'
import Joi from 'joi'
import OrdersController from '../../../controller/ordersController'

const OrderRoutes = Router()
const ordersController = new OrdersController()

OrderRoutes.use(isAuthenticated)
OrderRoutes.get('/', ordersController.listAll)
OrderRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.listOne,
)
OrderRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
)

export default OrderRoutes
