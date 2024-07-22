import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Hello {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  city: string;
}
