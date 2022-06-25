import { Request, Response } from 'express'
import { ResetPasswordService } from '../../../services/reset-password-service'

interface IResetPasswordRequest {
	token: string
	password: string
}

export class ResetPasswordController {
	async create(
		request: Request<
			Record<string, unknown>,
			Record<string, unknown>,
			IResetPasswordRequest
		>,
		response: Response
	): Promise<Response> {
		const { token, password } = request.body
		const resetPasswordService = new ResetPasswordService()

		await resetPasswordService.execute({ token, password })

		return response.status(204).json()
	}
}
