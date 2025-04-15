import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async geUserData(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
      },
    });
  }
}
