import { Injectable, NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'prisma/prisma.service';
import { NotFoundError } from 'rxjs';

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
        imageUrl: true,
        category: {
          select: {
            id: true,
            category: true,
          },
        },
      },
      orderBy: {
        category: {
          category: 'asc',
        },
      },
    });

    if (!products) {
      throw new NotFoundException('Товары не найден');
    }

    const categoriesMap = new Map();

    products.forEach((product) => {
      const item = {
        id: product.id,
        name: product.name,
        price: product.price,
        brand: product.brand,
        color: product.color,
        description: product.description,
        imageUrl: `http://localhost:7777/uploads/products/${product.imageUrl}`,
      };

      const categoryId = product.category.id;
      const categoryName = product.category.category;

      if (!categoriesMap.has(categoryId)) {
        categoriesMap.set(categoryId, {
          categoryName,
          categoryId,
          products: [],
        });
      }

      categoriesMap.get(categoryId)?.products.push(item);
    });

    const result = Array.from(categoriesMap.values()).map((category) => ({
      ...category,
      products: category.products,
    }));

    return result;
  }

  async getProduct(id: string) {
    const product = await this.prisma.products.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        brand: true,
        color: true,
        description: true,
        price: true,
        imageUrl: true,
      },
    });
    if (!product) {
      throw new NotFoundException('Товар не найден');
    }

    product.imageUrl = `http://localhost:7777/uploads/products/${product.imageUrl}`;

    return product;
  }
}
