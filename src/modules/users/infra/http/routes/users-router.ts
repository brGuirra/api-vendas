import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import multer from 'multer'
import { uploadConfig } from '@config/upload'
import { authenticationMiddelware } from '@shared/infra/http/middlewares/authentication-middleware'
import { UsersController } from '../controllers/users-controller'
import { UserAvatarController } from '../controllers/user-avatar-controller'

export const usersRouter = Router()
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()
const upload = multer(uploadConfig)

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

usersRouter.patch(
	'/avatar',
	authenticationMiddelware,
	upload.single('avatar'),
	userAvatarController.update
)
