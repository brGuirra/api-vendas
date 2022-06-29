import { IUserToken } from './IUserToken'

export interface IUserTokensRepository {
	findToken(token: string): Promise<IUserToken>

	generate(user_id: string): Promise<IUserToken>
}
