import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieManagerService {

  constructor(private cookieService: CookieService) { }
  setCookie(key: string, value: string) {
    this.cookieService.set(key, value);
  }
  getCookie(key: string) {
    return this.cookieService.get(key);
  }
}
