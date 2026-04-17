import Redis from 'ioredis'

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined
}

export const redis =
  globalForRedis.redis ??
  new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
  })

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis

// 缓存辅助函数
export const cache = {
  // 获取缓存
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key)
    return data ? JSON.parse(data) : null
  },

  // 设置缓存
  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    const data = JSON.stringify(value)
    if (ttl) {
      await redis.setex(key, ttl, data)
    } else {
      await redis.set(key, data)
    }
  },

  // 删除缓存
  async del(key: string): Promise<void> {
    await redis.del(key)
  },

  // 清空匹配模式的所有缓存
  async clear(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  },
}
