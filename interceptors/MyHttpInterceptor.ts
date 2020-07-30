import { NotificacaoService, TipoNotificacao } from 'src/app/shared/helpers/notificacao.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor(
    private notificacaoService: NotificacaoService
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
        this.notificacaoService.openNotificacao({
          titulo: 'Erro',
          mensagem: 'Não foi possível fazer conexão com o servidor'
        }, TipoNotificacao.ERRO);
        break;
      case 400: this.notificacaoService.openNotificacao({ titulo: 'Erro', mensagem: error.message }, TipoNotificacao.ERRO); break;
      case 403: this.notificacaoService.openNotificacao({ titulo: 'Erro', mensagem: error.message }, TipoNotificacao.ERRO); break;
      case 404: this.notificacaoService.openNotificacao({ titulo: 'Erro', mensagem: error.message }, TipoNotificacao.ERRO); break;
      case 422: this.notificacaoService.openNotificacao({ titulo: 'Erro', mensagem: error.message }, TipoNotificacao.ERRO); break;
    }
  }
}

export const HttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MyHttpInterceptor,
  multi: true
};
