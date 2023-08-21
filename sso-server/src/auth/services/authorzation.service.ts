import { AUTHORIZATION_ENFORCER } from '../../models/const';
import { Action } from './../../models/action.enum';

import { Inject, Injectable } from '@nestjs/common';

import { Enforcer } from 'casbin';

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject(AUTHORIZATION_ENFORCER) private readonly enforcer: Enforcer,
  ) {}

  public checkPermission(subject: string, object: string, action: string) {
    return this.enforcer.enforce(subject, object, action);
  }
  public mappingAction(method: string): Action {
    switch (method.toUpperCase()) {
      case 'GET':
        return Action.Read;
      case 'POST':
        return Action.Create;
      case 'PATCH':
      case 'PUT':
        return Action.Update;
      case 'DELETE':
        return Action.Delete;
      default:
        return Action.None;
    }
  }
}
