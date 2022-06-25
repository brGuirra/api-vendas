import { customersRouter } from '@modules/customers/infra/http/routes/customer-router'
import { ordersRouter } from '@modules/orders/infra/http/routes/orders-router'
import { productsRouter } from '@modules/products/infra/http/routes/products-router'
import { passwordRouter } from '@modules/users/infra/http/routes/password-router'
import { profileRouter } from '@modules/users/infra/http/routes/profile-router'
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions-router'
import { usersRouter } from '@modules/users/infra/http/routes/users-router'
import { Router } from 'express'

export const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/customers', customersRouter)
routes.use('/orders', ordersRouter)
