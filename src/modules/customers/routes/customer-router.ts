import { authenticationMiddelware } from '@shared/http/middlewares/authentication-middleware'
import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'
import { CustomersController } from '../controllers/customers-controller'

export const customersRouter = Router()
const customersController = new CustomersController()

customersRouter.use(authenticationMiddelware)

customersRouter.get('/', customersController.index)

customersRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	customersController.show
)

customersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
		},
	}),
	customersController.create
)

customersRouter.put(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
		},
	}),
	customersController.update
)

customersRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	customersController.delete
)
