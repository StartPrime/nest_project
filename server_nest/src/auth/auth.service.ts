import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}

  async register(registerDto: RegisterDto) {
    console.log(registerDto);
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Пользователь с такой почтой уже существует');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
      },
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('Неверная почта или пароль');
    }

    const checkPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    console.log(checkPassword);
    if (!checkPassword) {
      throw new NotFoundException('Неверная почта или пароль');
    }

    const tokens = this.tokenService.generateTokens(user.id);

    return tokens;
  }
}
