import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class JwtRolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();

      const authHeader: string = req.headers.authorization;

      const bearer: string = authHeader.split(' ')[0];
      const token: string = authHeader.split(' ')[1];

      if (bearer !== 'bearer' || !token) {
        console.log(bearer, token);
        throw new UnauthorizedException({ message: 'user is not authorized' });
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      // this should be implemented using user.roles.some() method for scaling purposes
      return user.role == requiredRoles;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({ message: 'user is not authorized' });
    }
  }
}
