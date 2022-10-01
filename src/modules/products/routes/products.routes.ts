import { Router } from 'express'
import ProductController from '../controller/productsController'
import { celebrate, Joi, Segments } from 'celebrate'

const productController = new ProductController()
const productRoutes = Router()

productRoutes.get('/', productController.listAll)
productRoutes.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  productController.listOne,
)
productRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).max(50).required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productController.create,
)
productRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).max(50).required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  productController.update,
)
productRoutes.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  productController.delete,
)

export default productRoutes
