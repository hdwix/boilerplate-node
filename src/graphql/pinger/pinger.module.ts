import { Module } from '@nestjs/common';
import { PingerResolver } from './pinger.resolver';

@Module({
    providers: [PingerResolver]
})
export class PingerModule {
}
