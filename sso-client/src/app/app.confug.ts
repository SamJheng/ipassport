import { HttpClientModule } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    importProvidersFrom(HttpClientModule),
    provideClientHydration(),
  ],
};