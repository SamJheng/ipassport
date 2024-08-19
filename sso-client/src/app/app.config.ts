import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from "./shared/auth/Interceptor/auth.interceptor";

registerLocaleData(en);
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    importProvidersFrom(HttpClientModule),
    provideClientHydration(),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};