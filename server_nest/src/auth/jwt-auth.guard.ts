import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1] || null;
    if (!token) {
      throw new UnauthorizedException('Токен не найден');
    }

    try {
      await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('Невалидный токен');
    }

    return true;
  }
}
