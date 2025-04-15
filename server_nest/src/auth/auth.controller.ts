import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() person: RegisterDto) {
    return this.authService.register(person);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(loginDto);

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return res.json({ accessToken: tokens.accessToken });
  }

  @Post('/logout')
  @HttpCode(200)
  logout(@Res() res: Response) {
    res.clearCookie('refreshToken');
    return res.json({ message: 'Выход успешен' });
  }

  @Post('/refresh')
  @HttpCode(200)
  async refreshAccessToken(@Req() req: Request) {
    if (!req.cookies.refreshToken) {
      throw new NotFoundException('Refresh токен не найден');
    }
    return this.authService.refresh(req.cookies.refreshToken);
  }
}
