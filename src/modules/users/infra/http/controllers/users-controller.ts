import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { container } from 'tsyringe'

import { ICreateUser } from '@modules/users/domain/models/ICreateUser'
import { CreateUserService } from '../../../services/create-user-service'
import { ListUsersService } from '../../../services/list-users-service'

export class UsersController {
	public async index(request: Request, response: Response): Promise<Response> {
		const listUsersService = container.resolve(ListUsersService)
		const users = await listUsersService.execute()

		return response.json(instanceToInstance(users))
	}

	public async create(
		request: Request<
			Record<string, unknown>,
			Record<string, unknown>,
			ICreateUser
		>,
		response: Response
	): Promise<Response> {
		const { name, email, password } = request.body
		const createUserService = container.resolve(CreateUserService)
		const user = await createUserService.execute({ name, email, password })

		return response.json(instanceToInstance(user))
	}
}
