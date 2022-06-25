import { Request, Response } from 'express'
import { SendForgotPasswordEmailService } from '../../../services/send-forgot-password-email-service'

interface IForgotPasswrordRequest {
	email: string
}

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
		const sendForgotPasswordEmailService = new SendForgotPasswordEmailService()
		await sendForgotPasswordEmailService.execute({ email })

		return response.status(204).json()
	}
}
