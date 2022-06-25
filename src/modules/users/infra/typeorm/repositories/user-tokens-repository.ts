import { EntityRepository, Repository } from 'typeorm'
import { UserToken } from '../entities/user-token'

@EntityRepository(UserToken)
export class UserTokensRepository extends Repository<UserToken> {
	public async findToken(token: string): Promise<UserToken | undefined> {
		return this.findOne({
			where: { token },
		})
	}

	public async generate(user_id: string): Promise<UserToken | undefined> {
		const userToken = this.create({
			user_id,
		})

		await this.save(userToken)

		return userToken
	}
}
