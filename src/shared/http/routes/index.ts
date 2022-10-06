import { Router } from 'express'
import productRoutes from '@modules/products/routes/products.routes'
import UserRoutes from '@modules/users/routes/users.routes'
import sessionRouter from '@modules/users/routes/session.routes'
import passwordRouter from '@modules/users/routes/password.routes'
import ProfileRoutes from '@modules/users/routes/profile.routes'
import CustomerRoutes from '@modules/customers/routes/customer.routes'
import OrderRoutes from '@modules/orders/routes/orders.routes'

const routes = Router()

routes.use('/products', productRoutes)
routes.use('/users', UserRoutes)
routes.use('/sessions', sessionRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', ProfileRoutes)
routes.use('/customers', CustomerRoutes)
routes.use('/orders', OrderRoutes)

export default routes
