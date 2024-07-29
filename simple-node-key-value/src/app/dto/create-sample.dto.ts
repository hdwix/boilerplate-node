import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSampleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  age: number;

  @IsString()
  @IsNotEmpty()
  city: string;
}
