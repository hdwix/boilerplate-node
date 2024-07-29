import { Injectable } from '@nestjs/common';
import { CreateSampleDto } from '../../app/dto/create-sample.dto';
import { PatchSampleDto } from '../../app/dto/patch-sample.dto';
import { UpdateSampleDto } from '../../app/dto/update-sample.dto';
import { LoggerService } from './logger.service';
import { RedisService } from '../../infrastructure/redis/redis.service';

@Injectable()
export class SampleService {
  private Log: LoggerService = new LoggerService(SampleService.name);
  constructor(private readonly redisService: RedisService) {}

  // 1 get Hello + Name
  getHello(name: string): string {
    return `Hello, ${name}!`;
  }

  // Post Hello name + age
  sayHello(createSampleDto: CreateSampleDto): string {
    return `Hello, ${createSampleDto.name} you are ${createSampleDto.age} years old`;
  }

  // Update current name => new name
  updateName(current_name: string, updateSampleDto: UpdateSampleDto): string {
    return `Your name is replaced from ${current_name} to ${updateSampleDto.new_name}`;
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
