import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { container } from 'tsyringe'

import { ICreateSessionRequest } from '@modules/users/domain/models/ICreateSessionRequest'
import { CreateSessionsService } from '../../../services/create-sessions-service'

export class SessionsController {
	async create(
		request: Request<
			Record<string, unknown>,
			Record<string, unknown>,
			ICreateSessionRequest
		>,
		response: Response
	): Promise<Response> {
		const { email, password } = request.body
		const createSessionsService = container.resolve(CreateSessionsService)
		const user = await createSessionsService.execute({ email, password })

		return response.json(instanceToInstance(user))
	}
}
