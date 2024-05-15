import { PartialType } from '@nestjs/mapped-types';
import { CreateHelloDto } from './create-hello.dto';
import { IsEmpty, IsString } from 'class-validator';

export class UpdateHelloDto extends PartialType(CreateHelloDto) {
  @IsString()
  current_name: string;

  @IsString()
  new_name: string;
}
