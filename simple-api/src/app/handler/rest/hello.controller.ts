import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { HelloService } from '../../modules/hello/hello.service';
import { CreateHelloDto } from '../../modules/hello/dto/create-hello.dto';
import { UpdateHelloDto } from '../../modules/hello/dto/update-hello.dto';
import { PatchHelloDto } from 'src/app/modules/hello/dto/patch-hello.dto';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  // Hello Name GET
  @Get(':name')
  getHello(@Param('name') name: string): { data: string } {
    const message = this.helloService.getHello(name);
    return { data: message };
  }

  // Name + Age POST
  @Post()
  sayHello(@Body() createHelloDto: CreateHelloDto): { data: { message: string } } {
    const message = this.helloService.sayHello(createHelloDto);
    return { data: { message } };
  }

  //
  @Put()
  updateName(@Body() updateHelloDto: UpdateHelloDto): { data: { message: string } } {
    const message = this.helloService.updateName(updateHelloDto);
    return { data: { message } };
  }

  // PATCH 
  @Patch(':id')
  updateNameById(@Param('id') id: number, @Body()patchHelloDto: PatchHelloDto): { data: { message: string, id: number } } {
    const { message, id: updatedId } = this.helloService.updateNameById(id, patchHelloDto);
    return { data: { message, id: updatedId } };
  }

  // DELETE by ID
  @Delete(':id')
  deleteDataById(@Param('id') id: number): { data: { message: string } } {
    const { message } = this.helloService.deleteDataById(id);
    return { data: { message } };
  }


  
}

