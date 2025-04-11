import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    const products = await this.prisma.products.findMany({
      select: {
        id: true,
        name: true,
        brand: true,
        color: true,
        description: true,
        price: true,
        imgUrl: true,
        category: {
          select: {
            category: true,
            id: true,
          },
        },
      },
    });

    return products.map((product) => ({
      ...product,
      imgUrl: `http://localhost:7777/uploads/products/${product.imgUrl}`,
      category: product.category.category,
      categoryId: product.category.id,
    }));
  }
}
