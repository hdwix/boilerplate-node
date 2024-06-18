import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../../app/product/dto/create-product.dto';
import { Product } from '../../domain/product/entities/product.entity';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly connection: Connection,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async update(id: number, product: Product): Promise<void> {
    await this.productRepository.update(id, product);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async createTransactionally(productData: CreateProductDto): Promise<Product> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let savedProduct: Product;

    try {
      // 1. Create the product:
      const newProduct = this.productRepository.create(productData);
      // 2. Save the product within the transaction:
      savedProduct = await queryRunner.manager.save(newProduct);

      // 3. Commit the transaction:
      await queryRunner.commitTransaction();
      console.log('create product sukses', savedProduct);

      return savedProduct;
    } catch (error) {
      // 4. If an error occurred, rollback the transaction:
      await queryRunner.rollbackTransaction();
      console.log('create product gagal, begin rollback', error);
      throw error; // Re-throw the error to handle it appropriately
    } finally {
      // 5. Always release the query runner connection:
      await queryRunner.release();
    }
  }
}
