import { IsNotEmpty, IsString } from "class-validator";

export class PingDto {

    @IsString()
    @IsNotEmpty()
    data: string;

    meta: {
      code: number;
      message: string;
    };
}