import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  baseUrl = environment.springboot.baseUrl;

  constructor(public storage: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const acessToken = this.storage.getAcessToken();

    const N = this.baseUrl.length;
    const requestToAPI = req.url.substring(0, N) === this.baseUrl;

    if (acessToken && requestToAPI) {
      const authReq = req.clone({ headers: req.headers.set('Authorization', acessToken) });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
