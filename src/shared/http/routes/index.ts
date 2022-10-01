import { Router } from 'express'
import productRoutes from '@modules/products/routes/products.routes'
import UserRoutes from '@modules/users/routes/users.routes'
import sessionRouter from '@modules/users/routes/session.routes'
import passwordRouter from '@modules/users/routes/password.routes'

const routes = Router()

routes.use('/products', productRoutes)
routes.use('/users', UserRoutes)
routes.use('/sessions', sessionRouter)
routes.use('/password', passwordRouter)

export default routes
