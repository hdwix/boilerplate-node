import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../controllers/product.controller';
import { ApiService } from '../../domain/services/product.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ProductDto } from '../dto/product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let apiService: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ApiService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    apiService = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const result: ProductDto[] = [
        {
          name: 'Laptop',
          data: {
            year: 2021,
            price: 999,
            CPU_model: 'Intel i7',
            Hard_disk_size: '1TB',
          },
        },
      ];
      jest.spyOn(apiService, 'get').mockResolvedValue(result);
      expect(await controller.getAllProducts()).toBe(result);
    });

    it('should handle exceptions', async () => {
      jest
        .spyOn(apiService, 'get')
        .mockRejectedValue(
          new HttpException('Not Found', HttpStatus.NOT_FOUND),
        );
      await expect(controller.getAllProducts()).rejects.toThrow(HttpException);
    });
  });

  describe('createProduct', () => {
    it('should return the created product', async () => {
      const productDto: ProductDto = {
        name: 'Desktop',
        data: {
          year: 2022,
          price: 1500,
          CPU_model: 'AMD Ryzen 7',
          Hard_disk_size: '2TB',
        },
      };
      jest.spyOn(apiService, 'post').mockResolvedValue(productDto);
      expect(await controller.createProduct(productDto)).toEqual(productDto);
    });

    it('should handle exceptions on creation', async () => {
      const productDto: ProductDto = {
        name: 'Desktop',
        data: {
          year: 2022,
          price: 1500,
          CPU_model: 'AMD Ryzen 7',
          Hard_disk_size: '2TB',
        },
      };
      jest
        .spyOn(apiService, 'post')
        .mockRejectedValue(
          new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      await expect(controller.createProduct(productDto)).rejects.toThrow(
        HttpException,
      );
    });
  });
});
