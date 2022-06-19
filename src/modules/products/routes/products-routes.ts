import { Router } from 'express'
import { ProductsController } from '../controllers/products-controller'

export const productsRoutes = Router()
const productsController = new ProductsController()

productsRoutes.get('/', productsController.index)
productsRoutes.get('/:id', productsController.show)
productsRoutes.post('/', productsController.create)
productsRoutes.put('/:id', productsController.update)
productsRoutes.delete('/:id', productsController.delete)
