import { authenticationMiddelware } from '@shared/infra/http/middlewares/authentication-middleware'
import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'
import { OrdersController } from '../controllers/orders-controller'

export const ordersRouter = Router()
const ordersController = new OrdersController()

ordersRouter.use(authenticationMiddelware)

ordersRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	ordersController.show
)

ordersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			customer_id: Joi.string().uuid().required(),
			products: Joi.array()
				.items(
					Joi.object({
						id: Joi.string().uuid().required(),
						quantity: Joi.number().required(),
					})
				)
				.required(),
		},
	}),
	ordersController.create
)
