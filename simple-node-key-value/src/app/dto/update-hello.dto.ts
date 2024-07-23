import { PartialType } from '@nestjs/mapped-types';
import { CreateHelloDto } from './create-hello.dto';
import { IsString } from 'class-validator';

export class UpdateHelloDto extends PartialType(CreateHelloDto) {
  @IsString()
  new_name: string;
}
