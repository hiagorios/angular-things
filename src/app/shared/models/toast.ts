export interface Toast {
  title: string;
  message: string;
  type?: ToastType;
  horizontalPosition?: 'start' | 'center' | 'end' | 'left' | 'right';
  verticalPosition?: 'top' | 'bottom';
  duration?: number;
  panelClass?: string[];
}

export enum ToastType {
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
  INFO = 'info'
}
