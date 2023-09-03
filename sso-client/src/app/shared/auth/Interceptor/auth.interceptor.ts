import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CookieManagerService } from '../../lib/cookie-manager.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieManagerService: CookieManagerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('/assets')) {
      return next.handle(req);
    }
    const token = this.cookieManagerService.getCookie('access_token');
    console.log(token)
    const request = req.clone({
      // url: environment.apiUrl + req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`,
        // 'Access-Control-Allow-Origin': '*'
      },
      //withCredentials: true, // Needed since we are using Session Cookies
    });

    return next.handle(request).pipe(
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
