import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSampleDto } from '../../app/dto/create-sample.dto';
import { PatchSampleDto } from '../../app/dto/patch-sample.dto';
import { UpdateSampleDto } from '../../app/dto/update-sample.dto';
import { Context, LoggerService } from './logger.service';
import { RedisService } from '../../infrastructure/redis/redis.service';

@Injectable()
export class SampleService {
  private Log: LoggerService = new LoggerService(SampleService.name);
  constructor(private readonly redisService: RedisService) {}

  // 1 get keyvalue + key
  async getKey(key: string): Promise<any> {
    const context: Context = {
      module: 'SampleService',
      method: 'getKey',
    };
    try {
      const cacheKey = `keyvalue:${key}`;
      const message = await this.redisService.get(cacheKey);

      if (message) {
        this.Log.logger(`Retrieved value for key '${key}' from cache`, context);
        return message;
      } else {
        this.Log.warn(`Key '${key}' not found in cache`, context);
        throw new NotFoundException('value not found in redis');
      }
    } catch (error) {
      this.Log.error(`Error get key : ${error.message}`, context);
      if (error.status === 404 || error.response?.statusCode === 404) {
        throw new NotFoundException(`${error.message}`);
      }
      throw new InternalServerErrorException(
        `Error get key : ${error.message}`,
      );
    }
  }

  // Post Hello name + age
  sayHello(createSampleDto: CreateSampleDto): string {
    return `Hello, ${createSampleDto.key} you are ${createSampleDto.value} years old`;
  }

  // Update new value
  async updateValue(
    key: string,
    value: UpdateSampleDto,
  ): Promise<{ message: string }> {
    try {
      const cacheKey = `keyvalue:${key}`;
      console.log('ini key', cacheKey);
      const current = await this.redisService.get(cacheKey);
      if (current == null) {
        console.log('ini current', current);
        throw new NotFoundException('key not found in redis');
      }
      const new_value = value.value;
      await this.redisService.update(cacheKey, JSON.stringify(new_value), 3600);
      const context: Context = {
        module: 'SampleService',
        method: 'updateValue',
      };
      this.Log.logger('Suceed', context);
      return { message: 'Update key value success' };
    } catch (error) {
      throw error;
    }
  }

  // PATCH
  updateNameById(
    id: number,
    patchHelloDto: PatchSampleDto,
  ): { message: string; id: number } {
    return {
      message: `Your name is replaced to ${patchHelloDto.new_name}`,
      id,
    };
  }

  // DELETE
  async deleteDataByKey(key: string): Promise<{ message: string }> {
    try {
      const result = await this.redisService.del(`keyvalue:${key}`);
      if (result === 0) {
        throw new NotFoundException('Data not found');
      }
      return { message: 'Delete key value success' };
    } catch (error) {
      throw error;
    }
  }
}
