import { Controller, Get, Post, Body, UsePipes, ValidationPipe, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-products.dto';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  private logger = new Logger('ProductsController');

  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    this.logger.verbose('retrieving all products.');
    return this.productsService.getProducts();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    this.logger.verbose(`Data: ${JSON.stringify(createProductDto)}`);
    return this.productsService.createProduct(createProductDto, user);
  }

}
