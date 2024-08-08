import { PartialType } from '@nestjs/mapped-types';
import { CreateSampleDto } from './create-sample.dto';
import { IsString } from 'class-validator';

export class UpdateSampleDto extends PartialType(CreateSampleDto) {
  @IsString()
  new_name: string;
}
