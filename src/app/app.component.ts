import { ToastService } from './core/services/toast.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-things';

  constructor(private toastService: ToastService) {

  }

  show() {

  }

}
