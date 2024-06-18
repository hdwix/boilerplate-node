// src/domain/product/product.module.ts
import { Module } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/repository/product.repository';
import { ProductService } from './service/product.service';
import { ProductController } from 'src/app/product/controller/product.controller';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
