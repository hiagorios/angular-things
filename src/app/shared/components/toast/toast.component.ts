import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Toast } from '../../models/toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  title: string;
  message: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: Toast,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.title = this.data.title;
    this.message = this.data.message;
  }

  close() {
    this.snackBar.dismiss();
  }

}
