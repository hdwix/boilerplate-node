import { Injectable } from '@nestjs/common';
import { CreateHelloDto } from '../..//app/dto/create-hello.dto';
import { PatchHelloDto } from '../..//app/dto/patch-hello.dto';
import { UpdateHelloDto } from '../../app/dto/update-hello.dto';

@Injectable()
export class HelloService {
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
  deleteDataById(id: number): { message: string } {
    return { message: 'Your data is deleted' };
  }
}
