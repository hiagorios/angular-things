import { NotificacaoComponent } from './../components/notificacao/notificacao.component';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarRef
} from '@angular/material';

export enum TipoNotificacao {
  SUCESSO = 'notificacao-sucesso',
  ALERTA = 'notificacao-alerta',
  ERRO = 'notificacao-erro',
  INFO = 'notificacao-info'
}

interface Notificacao {
  titulo: string;
  mensagem: string;
}

@Injectable()
export class NotificacaoService {

  snackBarConfig: MatSnackBarConfig;
  snackBarRef: MatSnackBarRef<any>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarAutoHide = '7000';

  notificationQueue: Notificacao[] = [];
  isInstanceVisible = false;

  constructor(private snackBar: MatSnackBar) { }

  // adds an array of notifications and start the queue
  startNotificationQueue(notifications: Notificacao[]) {
    this.notificationQueue = notifications;
    this.showNext();
  }

  // recursive method responsible of iterating over queue
  showNext() {
    // if (this.notificationQueue.length === 0) {
    //   return;
    // }
    const notification = this.notificationQueue.shift();
    if (notification) {
      this.isInstanceVisible = true;
      this.openNotificacao(notification);
      this.snackBarRef.afterDismissed().subscribe(() => {
        this.isInstanceVisible = false;
        this.showNext();
      });
    }
  }

  openNotificacao(toast: Notificacao, tipo: TipoNotificacao = TipoNotificacao.INFO) {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.horizontalPosition = this.horizontalPosition;
    this.snackBarConfig.verticalPosition = this.verticalPosition;
    this.snackBarConfig.duration = parseInt(this.snackBarAutoHide, 0);
    this.snackBarConfig.panelClass = ['notificacao', tipo];
    this.snackBarConfig.data = toast;
    this.snackBarRef = this.snackBar.openFromComponent(NotificacaoComponent, this.snackBarConfig);
  }
}

