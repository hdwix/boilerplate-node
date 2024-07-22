import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateHelloDto } from '../dto/create-hello.dto';
import { PatchHelloDto } from '../dto/patch-hello.dto';
import { UpdateHelloDto } from '../dto/update-hello.dto';
import { HelloService } from '../../domain/services/hello.service';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { Context, LoggerService } from '../../domain/services/logger.service';
import { RedisService } from '../../infrastructure/redis/redis.service';

@Controller('hello')
@UseInterceptors(new LoggingInterceptor())
export class HelloController {
  private Log: LoggerService = new LoggerService('createOperation');
  constructor(
    private readonly helloService: HelloService,
    private readonly redisService: RedisService,
  ) {}

  // Hello Name GET
  @Get(':name')
  async getHello(@Param('name') name: string): Promise<{ data: string }> {
    const cacheKey = `hello:${name}`;
    let message = await this.redisService.get(cacheKey, {
      module: 'HelloController',
      method: 'getHello',
    });

    if (!message) {
      message = this.helloService.getHello(name);
      await this.redisService.set(cacheKey, message, 3600);
    }
    const context: Context = { module: 'HelloController', method: 'getHello' };
    this.Log.logger('Succed', context);
    return { data: message };
  }

  // Name + Age POST
  @Post()
  async sayHello(
    @Body() createHelloDto: CreateHelloDto,
  ): Promise<{ data: { message: string } }> {
    const message = this.helloService.sayHello(createHelloDto);
    const context: Context = { module: 'HelloController', method: 'sayHello' };
    const cacheKey = `hello:${createHelloDto.name}`;
    await this.redisService.set(cacheKey, JSON.stringify(createHelloDto), 3600);
    this.Log.logger('Succed', context);
    return { data: { message } };
  }

  //
  @Put()
  updateName(@Body() updateHelloDto: UpdateHelloDto): {
    data: { message: string };
  } {
    const message = this.helloService.updateName(updateHelloDto);
    return { data: { message } };
  }

  // PATCH
  @Patch(':id')
  updateNameById(
    @Param('id') id: number,
    @Body() patchHelloDto: PatchHelloDto,
  ): { data: { message: string; id: number } } {
    const { message, id: updatedId } = this.helloService.updateNameById(
      id,
      patchHelloDto,
    );
    return { data: { message, id: updatedId } };
  }

  // DELETE by name
  @Delete('/delete/:name')
  async deleteDataByName(
    @Param('name') name: string,
  ): Promise<{ data: { message: string } }> {
    const { message } = await this.helloService.deleteDataByKey(name);
    return { data: { message } };
  }
}
