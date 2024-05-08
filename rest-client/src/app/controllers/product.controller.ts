// product.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiService } from '../../domain/services/product.service';
import { ProductDto } from '../dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  async getAllProducts(): Promise<ProductDto[]> {
    return await this.apiService.get('objects');
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() productDto: ProductDto): Promise<ProductDto> {
    return await this.apiService.post('objects', productDto);
  }
}
