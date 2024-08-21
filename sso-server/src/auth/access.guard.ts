import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessService } from '../users/services/access.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private accessService: AccessService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const access = this.reflector.get<{ role: string; object: string }>(
      HAS_ACCESS_KEY,
      context.getHandler(),
    );
    console.log(access);
    const request = context.switchToHttp().getRequest();
    const uid = request.user.sub;
    const accessList = await this.accessService.getAccessByUserId(uid);
    const fullAccess = accessList.find(
      (i) => i.object.name === '*' && i.role.name === '*',
    );
    console.log(accessList);
    if (fullAccess) {
      return true;
    }
    const hasObject = accessList.find((i) => i.object.name === access.object);
    console.log(hasObject);
    if (hasObject) {
      const reqRole = this.roleToNumber(access.role);
      const objRole = this.roleToNumber(hasObject.role.name);
      if (objRole >= reqRole) {
        return true;
      }
    }
    return false;
  }
  roleToNumber(roleName: string): number {
    switch (roleName) {
      case 'guest':
        return 1;
      case 'reader':
        return 2;
      case 'editor':
        return 3;
      case '*':
        return 4;
    }
  }
}
export const HAS_ACCESS_KEY = 'hasAccessKey';

export function HasAccess(access: { role: string; object: string }) {
  return applyDecorators(
    SetMetadata(HAS_ACCESS_KEY, access),
    UseGuards(AccessGuard),
  );
}
