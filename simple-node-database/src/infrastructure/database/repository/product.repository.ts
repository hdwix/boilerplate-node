// src/infrastructure/repository/product.repository.ts
import { Product } from 'src/domain/entities/product.entity';
import { IProductRepository } from 'src/domain/repository/product.repository.interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Product)
export class ProductRepository
  extends Repository<Product>
  implements IProductRepository
{
  async createProduct(name: string, price: number): Promise<Product> {
    const product = this.create({ name, price });
    return this.save(product);
  }

  async findProductById(id: number): Promise<Product> {
    return this.findOne({ where: { id } });
  }

  async updateProduct(
    id: number,
    name: string,
    price: number,
  ): Promise<Product> {
    const product = await this.findOne({ where: { id } });
    if (product) {
      product.name = name;
      product.price = price;
      return this.save(product);
    }
    throw new Error('Product not found');
  }

  async deleteProduct(id: number): Promise<void> {
    await this.delete(id);
  }
}
