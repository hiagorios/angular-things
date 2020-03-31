import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.scss']
})
export class NotificacaoComponent implements OnInit {

  titulo: string;
  mensagem: string;
  cssClasses: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.titulo = this.data.titulo;
    this.mensagem = this.data.mensagem;
    this.cssClasses = this.data.classes;
  }

  fechar() {
    this.snackBar.dismiss();
  }

}
