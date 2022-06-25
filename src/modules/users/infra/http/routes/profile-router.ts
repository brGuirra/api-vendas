import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import multer from 'multer'
import { uploadConfig } from '@config/upload'
import { authenticationMiddelware } from '@shared/infra/http/middlewares/authentication-middleware'
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
