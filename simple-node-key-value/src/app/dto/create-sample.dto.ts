import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSampleDto {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}
