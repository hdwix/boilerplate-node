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
import { CreateSampleDto } from '../dto/create-sample.dto';
import { PatchSampleDto } from '../dto/patch-sample.dto';
import { UpdateSampleDto } from '../dto/update-sample.dto';
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
  async getKey(@Param('key') key: string): Promise<{ data: any }> {
    const context: Context = {
      module: 'SampleController',
      method: 'getKey',
    };
    try {
      const message = await this.sampleService.getKey(key);
      this.Log.logger('Suceed', context);
      return { data: message };
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
    @Body() createSampleDto: CreateSampleDto,
  ): Promise<{ data: { message: string } }> {
    const message = this.sampleService.sayHello(createSampleDto);
    const context: Context = { module: 'HelloController', method: 'sayHello' };
    const cacheKey = `keyvalue:${createSampleDto.key}`;
    await this.redisService.set(
      cacheKey,
      JSON.stringify(createSampleDto),
      3600,
    );
    this.Log.logger('Succed', context);
    return { data: { message } };
  }

  //
  @Put(':name')
  async updateName(
    @Param('name') name: string,
    @Body() updateSampleDto: UpdateSampleDto,
  ): Promise<{
    data: { message: string };
  }> {
    const message = this.sampleService.updateName(name, updateSampleDto);
    const cacheKey = `hello:${name}`;
    const newValue = `Hello, ${updateSampleDto.new_name}!`;
    await this.redisService.update(cacheKey, newValue, 3600);
    return { data: { message } };
  }

  // PATCH
  @Patch(':id')
  async updateNameById(
    @Param('id') id: number,
    @Body() patchSampleDto: PatchSampleDto,
  ): Promise<{ data: { message: string; id: number } }> {
    const { message, id: updatedId } = this.sampleService.updateNameById(
      id,
      patchSampleDto,
    );
    return { data: { message, id: updatedId } };
  }

  // DELETE by key
  @Delete('/:key')
  async deleteDataByKey(
    @Param('key') key: string,
  ): Promise<{ data: { message: string } }> {
    try {
      const { message } = await this.sampleService.deleteDataByKey(key);
      return { data: { message } };
    } catch (error) {
      if (error.status === 404 || error.response?.statusCode === 404) {
        throw new NotFoundException(`${error.message}`);
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
