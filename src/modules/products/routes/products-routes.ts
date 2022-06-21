import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'

import { ProductsController } from '../controllers/products-controller'

export const productsRoutes = Router()
const productsController = new ProductsController()

productsRoutes.get('/', productsController.index)

productsRoutes.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	productsController.show
)

productsRoutes.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			price: Joi.number().precision(2).required(),
			quantity: Joi.number().required(),
		},
	}),
	productsController.create
)

productsRoutes.put(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
		[Segments.BODY]: {
			name: Joi.string().required(),
			price: Joi.number().precision(2).required(),
			quantity: Joi.number().required(),
		},
	}),
	productsController.update
)

productsRoutes.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	productsController.delete
)