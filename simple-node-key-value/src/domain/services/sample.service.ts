import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateHelloDto } from '../../app/dto/create-hello.dto';
import { PatchHelloDto } from '../../app/dto/patch-hello.dto';
import { UpdateHelloDto } from '../../app/dto/update-hello.dto';
import { Context, LoggerService } from './logger.service';
import { RedisService } from '../../infrastructure/redis/redis.service';

@Injectable()
export class SampleService {
  private log: LoggerService = new LoggerService(SampleService.name);
  constructor(private readonly redisService: RedisService) {}

  // 1 get keyvalue + key
  async getKey(key: string): Promise<{ value: string }> {
    const context: Context = {
      module: 'SampleService',
      method: 'getKey',
    };
    try {
      const cacheKey = `keyvalue:${key}`;
      const message = await this.redisService.get(cacheKey);

      if (message) {
        this.log.logger(`Retrieved value for key '${key}' from cache`, context);
        return JSON.parse(message);
      } else {
        this.log.warn(`Key '${key}' not found in cache`, context);
        throw new NotFoundException('value not found in redis');
      }
    } catch (error) {
      this.log.error(`Error get key : ${error.message}`, context);
      if (error.status === 404 || error.response?.statusCode === 404) {
        throw new NotFoundException(`${error.message}`);
      }
      throw new InternalServerErrorException(
        `Error get key : ${error.message}`,
      );
    }
  }

  // Post Hello name + age
  sayHello(createHelloDto: CreateHelloDto): string {
    return `Hello, ${createHelloDto.name} you are ${createHelloDto.age} years old`;
  }

  // Update current name => new name
  updateName(current_name: string, updateHelloDto: UpdateHelloDto): string {
    return `Your name is replaced from ${current_name} to ${updateHelloDto.new_name}`;
  }

  // PATCH
  updateNameById(
    id: number,
    patchHelloDto: PatchHelloDto,
  ): { message: string; id: number } {
    return {
      message: `Your name is replaced to ${patchHelloDto.new_name}`,
      id,
    };
  }

  // DELETE
  async deleteDataByKey(name: string): Promise<{ message: string }> {
    try {
      const result = await this.redisService.del(`hello:${name}`);
      if (result === 0) {
        return { message: 'Data not found' };
      }
      return { message: 'Your data is deleted' };
    } catch (error) {
      return { message: 'Error deleting data' };
    }
  }
}
