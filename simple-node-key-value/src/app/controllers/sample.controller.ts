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
  InternalServerErrorException,
  NotFoundException,
  Version,
} from '@nestjs/common';
import { CreateHelloDto } from '../dto/create-hello.dto';
import { PatchHelloDto } from '../dto/patch-hello.dto';
import { UpdateHelloDto } from '../dto/update-hello.dto';
import { SampleService } from '../../domain/services/sample.service';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { Context, LoggerService } from '../../domain/services/logger.service';
import { RedisService } from '../../infrastructure/redis/redis.service';

@Controller({
  path: 'samples',
  version: '1',
})
@UseInterceptors(new LoggingInterceptor())
export class SampleController {
  private Log: LoggerService = new LoggerService('createOperation');
  constructor(
    private readonly sampleService: SampleService,
    private readonly redisService: RedisService,
  ) {}

  @Get(':key')
  async getKey(@Param('key') key: string): Promise<{ value: any }> {
    const context: Context = {
      module: 'SampleController',
      method: 'getKey',
    };
    try {
      const message = await this.sampleService.getKey(key);
      this.Log.logger('Suceed', context);
      return { value: message };
    } catch (error) {
      this.Log.error(`Error get value for key : ${key}`);
      if (error.status === 404 || error.response?.statusCode === 404) {
        throw new NotFoundException(`${error.message}`);
      }
      throw new InternalServerErrorException('Internal Server Error Exception');
    }
  }

  // Name + Age POST
  @Post()
  async sayHello(
    @Body() createHelloDto: CreateHelloDto,
  ): Promise<{ data: { message: string } }> {
    const message = this.sampleService.sayHello(createHelloDto);
    const context: Context = { module: 'HelloController', method: 'sayHello' };
    const cacheKey = `keyvalue:${createHelloDto.name}`;
    await this.redisService.set(cacheKey, JSON.stringify(createHelloDto), 3600);
    this.Log.logger('Succed', context);
    return { data: { message } };
  }

  //
  @Put(':name')
  async updateName(
    @Param('name') name: string,
    @Body() updateHelloDto: UpdateHelloDto,
  ): Promise<{
    data: { message: string };
  }> {
    const message = this.sampleService.updateName(name, updateHelloDto);
    const cacheKey = `hello:${name}`;
    const newValue = `Hello, ${updateHelloDto.new_name}!`;
    await this.redisService.update(cacheKey, newValue, 3600);
    return { data: { message } };
  }

  // PATCH
  @Patch(':id')
  async updateNameById(
    @Param('id') id: number,
    @Body() patchHelloDto: PatchHelloDto,
  ): Promise<{ data: { message: string; id: number } }> {
    const { message, id: updatedId } = this.sampleService.updateNameById(
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
    const { message } = await this.sampleService.deleteDataByKey(name);
    return { data: { message } };
  }
}
