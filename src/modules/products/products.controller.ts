import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  ParseFloatPipe,
  ParseArrayPipe,
  HttpCode,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagePath'))
  async create(
    // @Param('categoryId', ParseUUIDPipe) categoryId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('price', ParseFloatPipe) price: number,
    @Body(
      'ingredientIds',
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    ingredientIds: string[],
    @Body()
    createProductDto: Omit<
      CreateProductDto,
      'price' | 'ingredientIds' | 'imagePath'
    >,
  ) {
    console.log({ file });
    const imagePath = file ? file.filename : null;
    console.log({ imagePath });

    return this.productsService.create(
      {
        ...createProductDto,
        price,
        imagePath,
        ingredientIds: ingredientIds || [],
      },
      // categoryId,
    );
  }

  // @Post(':categoryId')
  // @UseInterceptors(FileInterceptor('image'))
  // async create(
  //   @Param('categoryId', ParseUUIDPipe) categoryId: string,
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body('price', ParseFloatPipe) price: number,
  //   @Body(
  //     'ingredientIds',
  //     new ParseArrayPipe({ items: String, separator: ',', optional: true }),
  //   )
  //   ingredientIds: string[],
  //   @Body()
  //   createProductDto: Omit<
  //     CreateProductDto,
  //     'price' | 'ingredientIds' | 'imagePath'
  //   >,
  // ) {
  //   console.log({ file });
  //   const imagePath = file ? file.filename : null;
  //   console.log({ imagePath });

  //   return this.productsService.create(
  //     {
  //       ...createProductDto,
  //       price,
  //       imagePath,
  //       ingredientIds: ingredientIds || [],
  //     },
  //     categoryId,
  //   );
  // }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':categoryId')
  findProductsByCategory(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ) {
    return this.productsService.findProductsByCategoy(categoryId);
  }

  @Put(':productId')
  @UseInterceptors(FileInterceptor('imagePath'))
  update(
    @Param('productId', ParseUUIDPipe) productId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    updateProductDto: UpdateProductDto,
  ) {
    console.log({ file });
    console.log({ updateProductDto });
    return this.productsService.update(productId, updateProductDto, file);
  }

  @Patch(':productId/soft-delete')
  async softDeleteProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    const product = await this.productsService.softDelete(productId);

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return { message: 'Product successfully soft deleted' };
  }

  @Delete(':productId')
  @HttpCode(204)
  remove(@Param('productId', ParseUUIDPipe) productId: string) {
    return this.productsService.remove(productId);
  }
}
