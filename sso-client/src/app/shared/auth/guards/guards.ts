import { inject, Injectable } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";;
import { CookieManagerService } from "../../lib/cookie-manager.service";
import { SessionStorageService } from "../../lib/session-storage.service";

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const can = inject(AuthGuardService).canActivate(next, state);
  return can;
};

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private sessionStorageService: SessionStorageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // console.log(this.isLogin());
    return this.isLogin();
  }
  isLogin(): boolean {
    const login = this.sessionStorageService.loadingDataValue('access_token');
    return !!login;
  }
}