import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { configuration } from '../../models/tap.model';
import { GoogleOnetapService } from './google-onetap.service';

export const CONFIGURATION = new InjectionToken<configuration>('CONFIGURATION')
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GoogleModule {
  constructor() {
    let oneTapLib = document.createElement('script');
    oneTapLib.async = true;
    oneTapLib.src = 'https://accounts.google.com/gsi/client';
    document.head.appendChild(oneTapLib);
  }
  public static forRoot(config: configuration): ModuleWithProviders<GoogleModule>  {
    return {
      ngModule: GoogleModule,
      providers: [
        { provide: CONFIGURATION, useValue: config },
        GoogleOnetapService,
      ],
    }
  }
}
