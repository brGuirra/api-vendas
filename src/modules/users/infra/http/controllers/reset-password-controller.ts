import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IResetPasswordRequest } from '@modules/users/domain/models/IResetPasswordRequest'
import { ResetPasswordService } from '../../../services/reset-password-service'

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
		const resetPasswordService = container.resolve(ResetPasswordService)

		await resetPasswordService.execute({ token, password })

		return response.status(204).json()
	}
}
