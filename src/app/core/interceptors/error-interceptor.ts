import {
  HttpErrorResponse, HttpEvent,
  HttpHandler, HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ToastService } from './../services/toast.service';
import { ToastType } from 'src/app/shared/models/toast';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastService: ToastService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(req, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1), catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          this.handleServerError(error);
          console.log(error);
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(error);
      })
    ).toPromise();
  }

  handleServerError(error: HttpErrorResponse) {
    switch (error.status) {
      case 0:
        this.toastService.openToast({
          title: 'Erro',
          message: 'Não foi possível fazer conexão com o servidor',
          type: ToastType.DANGER
        });
        break;
      case 400: this.toastService.openToast({ title: 'Erro', message: error.message, type: ToastType.DANGER }); break;
      case 403: this.toastService.openToast({ title: 'Erro', message: error.message, type: ToastType.DANGER }); break;
      case 404: this.toastService.openToast({ title: 'Erro', message: error.message, type: ToastType.DANGER }); break;
      case 422: this.toastService.openToast({ title: 'Erro', message: error.message, type: ToastType.DANGER }); break;
    }
  }
}

export const HttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
