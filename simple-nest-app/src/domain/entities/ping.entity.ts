import { IsNotEmpty, IsString } from "class-validator";

export class Ping {

    @IsString() // Must be String
    @IsNotEmpty() // Must be Fill
    data: string;
    
    meta: {
      code: number;
      message: string;
    };

    
}