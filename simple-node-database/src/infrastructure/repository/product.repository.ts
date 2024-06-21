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
      const newProduct = this.productRepository.create(productData);
      savedProduct = await queryRunner.manager.save(newProduct);

      await queryRunner.commitTransaction();
      console.log('create product success', savedProduct);

      return savedProduct;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log('create product failed, begin rollback', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateTransactionally(
    id: number,
    productData: Partial<Product>,
  ): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingProduct = await queryRunner.manager.findOne(Product, {
        where: { id },
      });
      if (!existingProduct) {
        throw new Error(`Product with id ${id} not found`);
      }

      const updatedProduct = Object.assign(existingProduct, productData);
      await queryRunner.manager.save(updatedProduct);

      await queryRunner.commitTransaction();
      console.log('update product success', updatedProduct);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log('update product failed, begin rollback', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
