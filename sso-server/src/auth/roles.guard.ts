import { AuthorizationService } from './services/authorzation.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './models/role.enum';
import { ROLES_KEY } from './models/roles.decorator';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authorizationService: AuthorizationService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    (request as any).user = { role: 'admin' }; // 塞假資料來實測驗證功能
    const { user, path, method } = request as any;
    const action = this.authorizationService.mappingAction(method);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authorizationService.checkPermission(
      `role:${user.role}`,
      path,
      action,
    );
  }
}
