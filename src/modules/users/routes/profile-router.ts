import { profile } from 'node:console'
import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import multer from 'multer'
import { uploadConfig } from '@config/upload'
import { UsersController } from '../controllers/users-controller'
import { authenticationMiddelware } from '../../../shared/http/middlewares/authentication-middleware'
import { UserAvatarController } from '../controllers/user-avatar-controller'
import { ProfileController } from '../controllers/profile-controller'

export const profileRouter = Router()
const profileController = new ProfileController()
const upload = multer(uploadConfig)

profileRouter.use(authenticationMiddelware)

profileRouter.get('/', profileController.show)

profileRouter.put(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			old_password: Joi.string(),
			password: Joi.string().optional(),
			password_confirmation: Joi.string()
				.valid(Joi.ref('password'))
				.when('password', {
					is: Joi.exist(),
					then: Joi.required(),
				}),
		},
	}),
	profileController.update
)
