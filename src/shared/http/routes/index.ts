import { productsRoutes } from '@modules/products/routes/products-routes'
import { Request, Response, Router } from 'express'

export const routes = Router()

routes.use('/products', productsRoutes)
