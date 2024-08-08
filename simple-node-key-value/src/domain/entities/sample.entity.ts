import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Sample {
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
