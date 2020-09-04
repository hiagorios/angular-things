import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef
} from '@angular/material/snack-bar';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { Toast } from 'src/app/shared/models/toast';

@Injectable({ providedIn: 'root' })
export class ToastService {

  snackBarRef: MatSnackBarRef<any>;
  toastQueue: Toast[] = [];
  queueStarted = false;
  isInstanceVisible = false;

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Adds a toast to the queue and starts it if it's not running
   */
  addToQueue(toast: Toast) {
    this.toastQueue.push(toast);
    if (!this.queueStarted) {
      this.queueStarted = true;
      this.showNext();
    }
  }

  /**
   * Adds each toast of an array to the queue and starts it if it's not running
   */
  addArrayToQueue(toasts: Toast[]) {
    this.toastQueue = this.toastQueue.concat(toasts);
    if (!this.queueStarted) {
      this.queueStarted = true;
      this.showNext();
    }
  }

  // Recursive method responsible of iterating over queue
  private showNext() {
    const toast = this.toastQueue.shift();
    if (toast) {
      this.isInstanceVisible = true;
      this.openToast(toast);
      this.snackBarRef.afterDismissed().subscribe(() => {
        this.isInstanceVisible = false;
        this.showNext();
      });
    } else {
      this.queueStarted = false;
    }
  }

  /**
   * Imediatily opens the toast passed as argument
   */
  openToast(toast: Toast) {
    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.horizontalPosition = toast.horizontalPosition ? toast.horizontalPosition : 'right';
    snackBarConfig.verticalPosition = toast.verticalPosition ? toast.verticalPosition : 'top';
    snackBarConfig.duration = toast.duration ? toast.duration : 5000;
    snackBarConfig.panelClass = ['notificacao', toast.type ? toast.type : 'INFO'];
    if (toast.panelClass) {
      snackBarConfig.panelClass = snackBarConfig.panelClass.concat(toast.panelClass);
    }
    snackBarConfig.data = toast;
    this.snackBarRef = this.snackBar.openFromComponent(ToastComponent, snackBarConfig);
  }
}

