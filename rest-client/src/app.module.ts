import { Module } from '@nestjs/common';
import { GadgetService } from './modules/gadget/gadget.service';
import { GadgetController } from './handler/get-All-gadget.controller';

@Module({
  imports: [],
  controllers: [GadgetController],
  providers: [GadgetService],
})
export class AppModule {}
