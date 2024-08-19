import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CookieManagerService } from '../../lib/cookie-manager.service';
import { SessionStorageService } from '../../lib/session-storage.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private sessionStorageService: SessionStorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith('/assets')) {
      return next.handle(req);
    }
    const token = this.sessionStorageService.loadingDataValue('access_token');
    let request: HttpRequest<any> = req.clone();
    if (token) {
      request = req.clone({
        // url: environment.apiUrl + req.url,
        setHeaders: {
          Authorization: `Bearer ${token}`,
          // 'Access-Control-Allow-Origin': '*'
        },
        //withCredentials: true, // Needed since we are using Session Cookies
      });
    }else{
      request = req.clone();
    }
    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleErrorRes(error))
      );
  }
  private handleErrorRes(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 401:
        break;
    }
    return throwError(() => error);
  }
}
