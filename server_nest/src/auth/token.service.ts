import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateTokens(id: number) {
    const accessToken = this.jwtService.sign(
      { id },
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        secret: process.env.JWT_ACCESS_SECRET,
      },
    );
    const refreshToken = this.jwtService.sign(
      { id },
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        secret: process.env.JWT_REFRESH_SECRET,
      },
    );
    return { accessToken, refreshToken };
  }

  verifyRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Невалидный refresh token');
    }
  }

  generateAccessToken(id: number) {
    return this.jwtService.sign(
      { id },
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        secret: process.env.JWT_ACCESS_SECRET,
      },
    );
  }
}
