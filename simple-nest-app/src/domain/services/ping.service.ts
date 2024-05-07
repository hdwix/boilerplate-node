import { Injectable } from '@nestjs/common';
import { PingDto } from 'src/app/dtos/ping-dto';

@Injectable()
export class PongService {
    getPong(): PingDto {
        return {
            data: 'pong',
            meta: {
                code: 200,
                message: 'Success'
            }
        };
    }
}
