import { Module } from '@nestjs/common';
import { GadgetService } from './gadget.service';
import { GadgetController } from '../../handler/get-All-gadget.controller';

@Module({
  controllers: [GadgetController],
  providers: [GadgetService],
})
export class GadgetModule {}
