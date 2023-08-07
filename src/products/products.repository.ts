import { Product } from './product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-products.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private logger = new Logger('ProductRepository');

  async getProducts(): Promise<Product[]> {
    const query = this.createQueryBuilder('products');

    try {
      const products = await query.getMany();
      return products;
    } catch (error) {
      this.logger.error(`Failed to get products`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const { name, description, price, image } = createProductDto;

    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.image = image;

    try {
      await product.save();
    } catch (error) {
      this.logger.error(`Failed to create a task. Data: ${createProductDto}`, error.stack);
      throw new InternalServerErrorException();
    }

    return product;
  }
}
