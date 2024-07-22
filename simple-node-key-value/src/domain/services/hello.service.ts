import { Injectable } from '@nestjs/common';
import { CreateHelloDto } from '../..//app/dto/create-hello.dto';
import { PatchHelloDto } from '../..//app/dto/patch-hello.dto';
import { UpdateHelloDto } from '../../app/dto/update-hello.dto';
import { LoggerService } from './logger.service';
import { RedisService } from '../../infrastructure/redis/redis.service';

@Injectable()
export class HelloService {
  private Log: LoggerService = new LoggerService(HelloService.name);
  constructor(private readonly redisService: RedisService) {}

  // 1 get Hello + Name
  getHello(name: string): string {
    return `Hello, ${name}!`;
  }

  // Post Hello name + age
  sayHello(createHelloDto: CreateHelloDto): string {
    return `Hello, ${createHelloDto.name} you are ${createHelloDto.age} years old`;
  }

  // Update current name => new name
  updateName(updateHelloDto: UpdateHelloDto): string {
    return `Your name is replaced from ${updateHelloDto.current_name} to ${updateHelloDto.new_name}`;
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
    } catch (error) {}
    return { message: 'Error deleting data' };
  }
}
