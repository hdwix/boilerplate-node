import { Injectable, Inject } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { Logger } from '@nestjs/common';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

   constructor(@InjectRedis() private readonly redis: Redis) { }
 
    async set(key: string, value: string, ttlSeconds?: number): Promise<string | null> {
      try {
        const result = ttlSeconds 
          ? await this.redis.set(key, value, 'EX', ttlSeconds) 
          : await this.redis.set(key, value);
        this.logger.log(`Set key '${key}' to '${value}'${ttlSeconds ? ` (TTL: ${ttlSeconds}s)` : ''}`, { module: 'RedisService', method: 'set' });
        return result;
      } catch (error) {
        this.logger.error(`Error setting key '${key}': ${error}`, { module: 'RedisService', method: 'set' });
        throw error;
      }
    }

    async get(key: string, context?: { module: string, method: string }): Promise<string | null> {
      try {
        const value = await this.redis.get(key);
  
        if (value) {
          this.logger.log(`Retrieved value for key '${key}' from cache`, context);
        } else {
          this.logger.warn(`Key '${key}' not found in cache`, context);
        }
  
        return value;
      } catch (error) {
        this.logger.error(`Error getting value for key '${key}': ${error}`, context);
        return null;
      }
    }
  
 }
