import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHelloDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
