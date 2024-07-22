import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHelloDto {
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
