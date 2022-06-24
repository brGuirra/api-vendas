import Redis, { Redis as RedisClient } from 'ioredis'
import { cacheConfig } from '@config/cache'

export class RedisCache {
	private readonly client: RedisClient

	constructor() {
		this.client = new Redis(cacheConfig.config.redis)
	}

	public async save(key: string, value: any): Promise<void> {
		await this.client.set(key, JSON.stringify(value))
	}
}
