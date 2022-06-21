import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { UsersController } from '../controllers/users-controller'
import { authenticationMiddelware } from '../../../shared/http/middlewares/authentication-middleware'

export const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', authenticationMiddelware, usersController.index)

usersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	usersController.create
)
