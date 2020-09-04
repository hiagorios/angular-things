
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';


@Injectable({ providedIn: 'root' })
export class AutenticacaoService {

  private currentUserSource = new ReplaySubject<UsuarioAutenticado>(1);
  public currentUser$: Observable<UsuarioAutenticado>;
  private currentUser: UsuarioAutenticado;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private storage: StorageService,
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUser$ = this.currentUserSource.asObservable();
    this.currentUser$.subscribe(res => {
      this.currentUser = res;
    });
  }

  login(credenciais: CredenciaisDTO) {

    return new Promise(async (resolve, reject) => {
      this.doLogin(credenciais).subscribe(res => {
        const auth = res.headers.get('Authorization');
        if (auth) {
          this.successfulLogin(auth);
          resolve(true);
        }
      }, error => {
        reject(error);
      });
    });
  }

  doLogin(credenciais: CredenciaisDTO) {
    return this.http.post(
      `${environment.springboot.baseUrl}/login`,
      credenciais,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  logout() {
    this.storage.setAcessToken(null);
    this.currentUserSource.next(undefined);
    this.router.navigate(['home']);
  }

  successfulLogin(authorizationValue: string) {
    this.storage.setAcessToken(authorizationValue);
    this.currentUserSource.next(new UsuarioAutenticado(authorizationValue));
  }

  getCurrentUser(): UsuarioAutenticado {
    if (!this.currentUser) {
      if (this.isAuthenticated()) {
        const aToken = this.storage.getAcessToken();
        if (aToken) {
          this.currentUserSource.next(new UsuarioAutenticado(aToken));
        }
      }
    }
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    const aToken = this.storage.getAcessToken();
    if (aToken) {
      return !this.jwtHelper.isTokenExpired(aToken);
    }
    return false;
  }

  public hasAuthority(authority: string): boolean {
    let has = false;
    if (this.getCurrentUser()) {
      this.currentUser.authorities.forEach(a => {
        if (a === authority) {
          has = true;
        }
      });
    }
    return has;
  }

  public perfilHasAuthority(authority: string, perfil: Perfil): boolean {
    let has = false;
    perfil.moduloAcoes.forEach(modAcao => {
      if (modAcao.authority === authority) {
        has = true;
      }
    });
    return has;
  }
}
