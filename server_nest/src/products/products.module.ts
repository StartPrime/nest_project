import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [PrismaClient],
})
export class ProductsModule {}
