import { DynamicModule, Module } from '@nestjs/common';

import { newEnforcer } from 'casbin';

// import { AuthorizationService } from './authorization.service';
// import { AUTHORIZATION_ENFORCER } from './constants/token.const';
import { RegisterOptions } from './models/option.model';
export const AUTHORIZATION_ENFORCER = 'authorization_enforcer';
@Module({})
export class AuthorizationModule {
  static register(options: RegisterOptions): DynamicModule {
    const { modelPath, policyAdapter, global = false } = options;
    console.log(options);
    const providers = [
      {
        provide: AUTHORIZATION_ENFORCER,
        useFactory: async () => {
          const enforcer = await newEnforcer(modelPath, policyAdapter);
          const roles = await enforcer.getAllRoles();
          const s = await enforcer.getAllSubjects();
          const a = await enforcer.getAllActions();
          const o = await enforcer.getAllObjects();
          console.log(roles);
          return enforcer;
        },
      },
      // AuthorizationService,
    ];
    console.log(providers);
    return {
      global,
      providers,
      module: AuthorizationModule,
      exports: [...providers],
    };
  }
}
