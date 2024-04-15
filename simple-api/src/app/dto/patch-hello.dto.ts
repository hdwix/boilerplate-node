import { IsEmpty, IsString } from 'class-validator';

export class PatchHelloDto {
  @IsString()
  new_name: string;
}
