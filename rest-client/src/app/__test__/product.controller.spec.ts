// product.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from '../../domain/services/product.service';
import { ProductController } from '../controllers/product.controller';

describe('ProductController', () => {
  let controller: ProductController;
  let apiService: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ApiService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    apiService = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const result = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ];
      jest
        .spyOn(apiService, 'get')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.getAllProducts()).toBe(result);
    });
  });

  describe('createProduct', () => {
    it('should return the created product', async () => {
      const productDto = {
        name: 'Apple MacBook Pro 16',
        data: {
          year: 2019,
          price: 1849.99,
          CPU_model: 'Intel Core i9',
          Hard_disk_size: '1 TB',
        },
      };

      const createdProduct = { id: 1, ...productDto };
      jest
        .spyOn(apiService, 'post')
        .mockImplementation(() => Promise.resolve(createdProduct));

      expect(await controller.createProduct(productDto)).toBe(createdProduct);
    });
  });
});
