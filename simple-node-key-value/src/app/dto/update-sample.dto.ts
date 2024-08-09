import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSampleDto {
  @IsNotEmpty()
  @IsString()
  value: string;
}
