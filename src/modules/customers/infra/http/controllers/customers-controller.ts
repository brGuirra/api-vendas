import { Request, Response } from 'express'
import { CreateCustomerService } from '../../../services/create-customer-service'
import { DeleteCustomerService } from '../../../services/delete-customer-service'
import { ListCustomersService } from '../../../services/list-customers-service'
import { ShowCustomerService } from '../../../services/show-customer-service'
import { UpdateCustomerService } from '../../../services/update-customer-service'

interface ICustomerRequest {
	name: string
	email: string
}

export class CustomersController {
	public async index(request: Request, response: Response): Promise<Response> {
		const listCustomersService = new ListCustomersService()

		const customers = await listCustomersService.execute()

		return response.json(customers)
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const showCustomerService = new ShowCustomerService()

		const customer = await showCustomerService.execute({ id })

		return response.json(customer)
	}

	public async create(
		request: Request<
			Record<string, unknown>,
			Record<string, unknown>,
			ICustomerRequest
		>,
		response: Response
	): Promise<Response> {
		const { name, email } = request.body

		const createCustomerService = new CreateCustomerService()

		const customer = await createCustomerService.execute({
			name,
			email,
		})

		return response.json(customer)
	}

	public async update(
		request: Request<{ id: string }, Record<string, unknown>, ICustomerRequest>,
		response: Response
	): Promise<Response> {
		const { name, email } = request.body
		const { id } = request.params

		const updateCustomerService = new UpdateCustomerService()

		const customer = await updateCustomerService.execute({
			id,
			name,
			email,
		})

		return response.json(customer)
	}

	public async delete(
		request: Request<{ id: string }>,
		response: Response
	): Promise<Response> {
		const { id } = request.params

		const deleteCustomerService = new DeleteCustomerService()

		await deleteCustomerService.execute({ id })

		return response.json({ message: `Customer ${id} deleted` })
	}
}
