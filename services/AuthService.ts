import { Injectable, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/models/Usuario';
import { UsuarioService } from './UsuarioService';
import { take, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private keyName = 'access_token';
  private currentUser: Usuario;

  constructor(
    private router: Router,
    private userService: UsuarioService
  ) { }

  authenticate(accessToken: string) {
    new Promise((resolve) => {
      this.storeAccessToken(accessToken);
      resolve('token stored');
    }).then((res) => {
      this.userService.findLoggedUser().subscribe(usuario => {
        this.setCurrentUser(usuario);
      });
    });
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem(this.keyName);
    this.router.navigateByUrl('/home');
  }

  getAccessToken(): string {
    // console.log('Access token retrieved');
    return JSON.parse(localStorage.getItem(this.keyName));
  }

  storeAccessToken(token: string) {
    // console.log('Access token stored');
    localStorage.setItem(this.keyName, JSON.stringify(token));
  }

  setCurrentUser(user: Usuario) {
    // console.log('Current user set');
    this.currentUser = user;
    // set user or save in storage
  }

  getCurrentUser(): Usuario {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.currentUser != null;
  }

}
