import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { Context, LoggerService } from 'src/domain/services/logger.service';

@Injectable()
export class RedisService {
  private log: LoggerService = new LoggerService(RedisService.name);

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
      this.log.logger(
        `Set key '${key}' to '${value}'${ttlSeconds ? ` (TTL: ${ttlSeconds}s)` : ''}`,
        { module: 'RedisService', method: 'set' },
      );
      return result;
    } catch (error) {
      this.log.error(`Error setting key '${key}': ${error}`, {
        module: 'RedisService',
        method: 'set',
      });
      throw error;
    }
  }

  async get(key: string): Promise<string | null> {
    const context: Context = {
      module: 'RedisService',
      method: 'get',
    };
    try {
      const value = await this.redis.get(key);
      return value;
    } catch (error) {
      this.log.error(`Error get value from redis : ${error.message}`, context);
      throw new InternalServerErrorException('Error get value from Redis');
    }
  }

  async del(key: string): Promise<number> {
    try {
      const result = await this.redis.del(key);
      this.log.logger(`Deleted key '${key}'`, {
        module: 'RedisService',
        method: 'del',
      });
      return result;
    } catch (error) {
      this.log.error(`Error deleting key '${key}': ${error}`, {
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
      this.log.logger(
        `Updated key '${key}' to '${value}'${ttlSeconds ? ` (TTL: ${ttlSeconds}s)` : ''}`,
        { module: 'RedisService', method: 'update' },
      );
      return result;
    } catch (error) {
      this.log.error(`Error setting key '${key}': ${error}`, {
        module: 'RedisService',
        method: 'update',
      });
      throw error;
    }
  }
}
