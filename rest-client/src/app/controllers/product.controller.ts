// product.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiService } from '../../domain/services/product.service';
import { ProductDto } from '../dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  async getAllProducts(): Promise<any> {
    return await this.apiService.get('objects');
  }

  @Post()
  async createProduct(@Body() productDto: ProductDto): Promise<any> {
    return await this.apiService.post('objects', productDto);
  }
}
