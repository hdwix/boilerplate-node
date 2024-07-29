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
import { CreateSampleDto } from '../dto/create-sample.dto';
import { PatchSampleDto } from '../dto/patch-sample.dto';
import { UpdateSampleDto } from '../dto/update-sample.dto';
import { SampleService } from '../../domain/services/sample.service';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { Context, LoggerService } from '../../domain/services/logger.service';
import { RedisService } from '../../infrastructure/redis/redis.service';

@Controller('samples')
@UseInterceptors(new LoggingInterceptor())
export class SampleController {
  private Log: LoggerService = new LoggerService('createOperation');
  constructor(
    private readonly sampleService: SampleService,
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
      message = this.sampleService.getHello(name);
      await this.redisService.set(cacheKey, message, 3600);
    }
    const context: Context = { module: 'HelloController', method: 'getHello' };
    this.Log.logger('Succed', context);
    return { data: message };
  }

  // Name + Age POST
  @Post()
  async sayHello(
    @Body() createSampleDto: CreateSampleDto,
  ): Promise<{ data: { message: string } }> {
    const message = this.sampleService.sayHello(createSampleDto);
    const context: Context = { module: 'HelloController', method: 'sayHello' };
    const cacheKey = `hello:${createSampleDto.name}`;
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

  // DELETE by name
  @Delete('/delete/:name')
  async deleteDataByName(
    @Param('name') name: string,
  ): Promise<{ data: { message: string } }> {
    const { message } = await this.sampleService.deleteDataByKey(name);
    return { data: { message } };
  }
}
