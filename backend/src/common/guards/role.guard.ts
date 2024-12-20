import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { USER_ROLES } from '../../utils/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<USER_ROLES[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.roles || user.roles.length === 0) {
      throw new ForbiddenException(
        'Access denied: user roles are not defined.',
      );
    }
    const userRolesSet = new Set(user.roles);
    const hasRole = requiredRoles.some((role) => userRolesSet.has(role));

    if (!hasRole) {
      throw new ForbiddenException('Access denied: insufficient permissions.');
    }

    return true;
  }
}
