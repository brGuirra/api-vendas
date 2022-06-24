import { customersRouter } from '@modules/customers/routes/customer-router'
import { ordersRouter } from '@modules/orders/routes/orders-router'
import { productsRouter } from '@modules/products/routes/products-router'
import { passwordRouter } from '@modules/users/routes/password-router'
import { profileRouter } from '@modules/users/routes/profile-router'
import { sessionsRouter } from '@modules/users/routes/sessions-router'
import { usersRouter } from '@modules/users/routes/users-router'
import { Router } from 'express'

export const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/customers', customersRouter)
routes.use('/orders', ordersRouter)
