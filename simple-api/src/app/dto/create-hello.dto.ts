import { IsEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHelloDto {
  @IsString()
  @IsEmpty()
  name: string;

  @IsNumber()
  @IsEmpty()
  age: number;
}
