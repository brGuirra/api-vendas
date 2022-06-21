import { productsRouter } from '@modules/products/routes/products-router'
import { usersRouter } from '@modules/users/routes/users-router'
import { Router } from 'express'

export const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
