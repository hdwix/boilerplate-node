import { IsString } from 'class-validator';

export class PatchSampleDto {
  @IsString()
  new_name: string;
}
