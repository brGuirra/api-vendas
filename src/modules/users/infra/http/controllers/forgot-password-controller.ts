import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IForgotPasswrordRequest } from '@modules/users/domain/models/IForgotPasswrordRequest'
import { SendForgotPasswordEmailService } from '../../../services/send-forgot-password-email-service'

export class ForgotPasswordController {
	async create(
		request: Request<
			Record<string, unknown>,
			Record<string, unknown>,
			IForgotPasswrordRequest
		>,
		response: Response
	): Promise<Response> {
		const { email } = request.body
		const sendForgotPasswordEmailService = container.resolve(
			SendForgotPasswordEmailService
		)
		await sendForgotPasswordEmailService.execute(email)

		return response.status(204).json()
	}
}
