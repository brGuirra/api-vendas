import Redis, { Redis as RedisClient } from 'ioredis'
import { cacheConfig } from '@config/cache'

export class RedisCache {
	public static getInstance(): RedisCache {
		if (!RedisCache.instance) {
			RedisCache.instance = new RedisCache()
		}

		return RedisCache.instance
	}

	private static instance: RedisCache
	private readonly client: RedisClient

	private constructor() {
		this.client = new Redis(cacheConfig.config.redis)
	}

	public async save(key: string, value: any): Promise<void> {
		await this.client.set(key, JSON.stringify(value))
	}

	public async recover<T>(key: string): Promise<T | undefined> {
		const data = await this.client.get(key)

		if (!data) {
			return undefined
		}

		return JSON.parse(data) as T
	}

	public async invalidate(key: string): Promise<void> {
		await this.client.del(key)
	}
}
