import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from './product.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, Connection, QueryRunner } from 'typeorm';
import { Product } from '../../domain/product/entities/product.entity';
import { CreateProductDto } from '../../app/product/dto/create-product.dto';

const mockProductRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
});

const mockConnection = () => ({
  createQueryRunner: jest.fn(),
});

describe('ProductRepository', () => {
  let productRepository: ProductRepository;
  let productRepo;
  let connection;
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepository,
        {
          provide: getRepositoryToken(Product),
          useFactory: mockProductRepository,
        },
        {
          provide: Connection,
          useFactory: mockConnection,
        },
      ],
    }).compile();

    productRepository = module.get<ProductRepository>(ProductRepository);
    productRepo = module.get<Repository<Product>>(getRepositoryToken(Product));
    connection = module.get<Connection>(Connection);

    queryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        save: jest.fn(),
      },
    } as unknown as QueryRunner;
  });

  describe('findAll', () => {
    it('gets all products from the repository', async () => {
      productRepo.find.mockResolvedValue('someProducts');
      const result = await productRepository.findAll();
      expect(result).toEqual('someProducts');
    });
  });

  describe('findOne', () => {
    it('gets a single product by id from the repository', async () => {
      const mockProduct = { id: 1, name: 'Test Product', price: 10 };
      productRepo.findOne.mockResolvedValue(mockProduct);
      const result = await productRepository.findOne(1);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('create', () => {
    it('saves a product to the repository', async () => {
      const mockProduct = { id: 1, name: 'Test Product', price: 10 };
      productRepo.save.mockResolvedValue(mockProduct);
      const result = await productRepository.create(mockProduct as Product);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('update', () => {
    it('updates a product in the repository', async () => {
      productRepo.update.mockResolvedValue({ affected: 1 });
      await expect(
        productRepository.update(1, {} as Product),
      ).resolves.not.toThrow();
    });
  });

  describe('remove', () => {
    it('removes a product from the repository', async () => {
      productRepo.delete.mockResolvedValue({ affected: 1 });
      await expect(productRepository.remove(1)).resolves.not.toThrow();
    });
  });

  describe('createTransactionally', () => {
    it('creates a product within a transaction', async () => {
      connection.createQueryRunner.mockReturnValue(queryRunner);
      const productData: CreateProductDto = { name: 'Test Product', price: 10 };
      const savedProduct = { ...productData, id: 1 };
      (queryRunner.manager.save as jest.Mock).mockResolvedValue(savedProduct);

      const result = await productRepository.createTransactionally(productData);
      expect(queryRunner.connect).toHaveBeenCalled();
      expect(queryRunner.startTransaction).toHaveBeenCalled();
      expect(queryRunner.manager.save).toHaveBeenCalledWith(
        expect.objectContaining(productData),
      );
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
      expect(queryRunner.release).toHaveBeenCalled();
      expect(result).toEqual(savedProduct);
    });

    it('rolls back the transaction if an error occurs', async () => {
      connection.createQueryRunner.mockReturnValue(queryRunner);
      const productData: CreateProductDto = { name: 'Test Product', price: 10 };
      (queryRunner.manager.save as jest.Mock).mockRejectedValue(
        new Error('Test error'),
      );

      await expect(
        productRepository.createTransactionally(productData),
      ).rejects.toThrow('Test error');
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(queryRunner.release).toHaveBeenCalled();
    });
  });
});
