import { Router } from 'express'
import productRoutes from '@modules/products/infra/http/routes/products.routes'
import UserRoutes from '@modules/users/infra/http/routes/users.routes'
import sessionRouter from '@modules/users/infra/http/routes/session.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes'
import ProfileRoutes from '@modules/users/infra/http/routes/profile.routes'
import CustomerRoutes from '@modules/customers/infra/http/routes/customer.routes'
import OrderRoutes from '@modules/orders/infra/http/routes/orders.routes'

const routes = Router()

routes.use('/products', productRoutes)
routes.use('/users', UserRoutes)
routes.use('/sessions', sessionRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', ProfileRoutes)
routes.use('/customers', CustomerRoutes)
routes.use('/orders', OrderRoutes)

export default routes
