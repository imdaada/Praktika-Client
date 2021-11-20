import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url !== 'http://localhost:8080/authenticate') {
      if (request.url !== 'http://localhost:8080/register') {
        const newReqest = request.clone({headers: request.headers.set('Authorization', this.cookieService.get('token'))});
        console.log(newReqest);
        return next.handle(newReqest).pipe(tap(
          (err) => {
            if (err instanceof HttpResponse) {
              if (err.body.message === 'Unauthorized') {
                console.log('Unauthorized');
                alert('Вы не авторизованы!');
                this.router.navigateByUrl('/login');
              }
            }
          },
          (err) => {
            if (err instanceof HttpErrorResponse) {
              console.log('Unauthorized');
              alert('Вы не авторизованы!');
              this.router.navigateByUrl('/login');
            }
          }));
      }
    }
    return next.handle(request);
  }
}
