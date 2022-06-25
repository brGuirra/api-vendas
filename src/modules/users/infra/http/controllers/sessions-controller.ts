import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'

import { CreateSessionsService } from '../../../services/create-sessions-service'

interface ISessionRequest {
	email: string
	password: string
}

export class SessionsController {
	async create(
		request: Request<
			Record<string, unknown>,
			Record<string, unknown>,
			ISessionRequest
		>,
		response: Response
	): Promise<Response> {
		const { email, password } = request.body
		const createSessionsService = new CreateSessionsService()
		const user = await createSessionsService.execute({ email, password })

		return response.json(instanceToInstance(user))
	}
}
