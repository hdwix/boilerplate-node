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
import { Context, LoggerService } from 'src/domain/services/logger.service';

@Controller('hello')
@UseInterceptors(new LoggingInterceptor())
export class HelloController {
  private Log: LoggerService = new LoggerService('createOperation');
  constructor(private readonly helloService: HelloService) {}

  // Hello Name GET
  @Get(':name')
  getHello(@Param('name') name: string): { data: string } {
    const message = this.helloService.getHello(name);
    const context: Context = { module: 'HelloController', method: 'getHello' };
    this.Log.logger('Succed', context);
    return { data: message };
  }

  // Name + Age POST
  @Post()
  sayHello(@Body() createHelloDto: CreateHelloDto): {
    data: { message: string };
  } {
    const message = this.helloService.sayHello(createHelloDto);
    const context: Context = { module: 'HelloController', method: 'sayHello' };
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

  // DELETE by ID
  @Delete(':id')
  deleteDataById(@Param('id') id: number): { data: { message: string } } {
    const { message } = this.helloService.deleteDataById(id);
    return { data: { message } };
  }
}
