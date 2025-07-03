import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ExtendedRequest } from '../utils/http-extended-req.interface';
import { jwtConstants, STATIC_MESSAGES } from '../utils/utility.const';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
  ) { }

  async use(req: ExtendedRequest, res: any, next: () => void) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(STATIC_MESSAGES.TOKEN_MISSING);
    }

    const token = authHeader.split('Bearer ')[1];

    // Check if token is blacklisted

    next();
  }
}
