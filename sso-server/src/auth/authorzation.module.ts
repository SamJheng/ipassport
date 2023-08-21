import { AUTHORIZATION_ENFORCER } from '../models/const';
import { DynamicModule, Module } from '@nestjs/common';

import { newEnforcer } from 'casbin';
import { RegisterOptions } from './models/option.model';
import { AuthorizationService } from './services/authorzation.service';

@Module({})
export class AuthorizationModule {
  static async register(options: RegisterOptions): Promise<DynamicModule> {
    const { modelPath, policyAdapter, global = false } = options;
    const providers = [
      {
        provide: AUTHORIZATION_ENFORCER,
        useFactory: async () => {
          const enforcer = await newEnforcer(modelPath, policyAdapter);
          const o = await enforcer.getAllObjects();
          console.log(o);
          return enforcer;
        },
      },
      AuthorizationService,
    ];
    return {
      global,
      providers: providers,
      module: AuthorizationModule,
      exports: providers,
    };
  }
}
