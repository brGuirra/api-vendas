import { IUserToken } from '@modules/users/domain/models/IUserToken'
import { IUserTokensRepository } from '@modules/users/domain/models/IUserTokensRepository'
import { getRepository, Repository } from 'typeorm'
import { UserToken } from '../entities/user-token'

export class UserTokensRepository implements IUserTokensRepository {
	private readonly ormRepository: Repository<UserToken>

	constructor() {
		this.ormRepository = getRepository(UserToken)
	}

	public async findToken(token: string): Promise<IUserToken> {
		const userToken = await this.ormRepository.findOne({
			where: { token },
		})

		return userToken
	}

	public async generate(user_id: string): Promise<IUserToken> {
		const userToken = this.ormRepository.create({
			user_id,
		})

		await this.ormRepository.save(userToken)

		return userToken
	}
}
