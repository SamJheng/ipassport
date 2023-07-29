import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('/assets')) {
      return next.handle(req);
    }
    console.log(req)
    const request = req.clone({
      // url: environment.apiUrl + req.url,
      withCredentials: true, // Needed since we are using Session Cookies
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
