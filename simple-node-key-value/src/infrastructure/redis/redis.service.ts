import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { LoggerService } from 'src/domain/services/logger.service';

@Injectable()
export class RedisService {
  private Log: LoggerService = new LoggerService(RedisService.name);

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async set(
    key: string,
    value: string,
    ttlSeconds?: number,
  ): Promise<string | null> {
    try {
      const result = ttlSeconds
        ? await this.redis.set(key, value, 'EX', ttlSeconds)
        : await this.redis.set(key, value);
      this.Log.logger(
        `Set key '${key}' to '${value}'${ttlSeconds ? ` (TTL: ${ttlSeconds}s)` : ''}`,
        { module: 'RedisService', method: 'set' },
      );
      return result;
    } catch (error) {
      this.Log.error(`Error setting key '${key}': ${error}`, {
        module: 'RedisService',
        method: 'set',
      });
      throw error;
    }
  }

  async get(
    key: string,
    context?: { module: string; method: string },
  ): Promise<string | null> {
    try {
      const value = await this.redis.get(key);

      if (value) {
        this.Log.logger(`Retrieved value for key '${key}' from cache`, context);
      } else {
        this.Log.warn(`Key '${key}' not found in cache`, context);
      }

      return value;
    } catch (error) {
      this.Log.error(`Error getting value for key '${key}': ${error}`, context);
      return null;
    }
  }

  async del(key: string): Promise<number> {
    try {
      const result = await this.redis.del(key);
      this.Log.logger(`Deleted key '${key}'`, {
        module: 'RedisService',
        method: 'del',
      });
      return result;
    } catch (error) {
      this.Log.error(`Error deleting key '${key}': ${error}`, {
        module: 'RedisService',
        method: 'del',
      });
      throw error;
    }
  }

  async update(
    key: string,
    value: string,
    ttlSeconds?: number,
  ): Promise<string | null> {
    try {
      const result = ttlSeconds
        ? await this.redis.set(key, value, 'EX', ttlSeconds)
        : await this.redis.set(key, value);
      this.Log.logger(
        `Updated key '${key}' to '${value}'${ttlSeconds ? ` (TTL: ${ttlSeconds}s)` : ''}`,
        { module: 'RedisService', method: 'update' },
      );
      return result;
    } catch (error) {
      this.Log.error(`Error setting key '${key}': ${error}`, {
        module: 'RedisService',
        method: 'update',
      });
      throw error;
    }
  }
}
