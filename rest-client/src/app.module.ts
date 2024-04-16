import { Module } from '@nestjs/common';
import { ApiService } from './domain/services/product.service';
import { ProductController } from './app/controllers/product.controller';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ApiService],
})
export class AppModule {}
