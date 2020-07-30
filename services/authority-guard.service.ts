import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({ providedIn: 'root' })
export class AuthorityGuardService implements CanActivate {

  constructor(public auth: AutenticacaoService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isAuthenticated: boolean = route.data.isAuthenticated;
    const hasAuthority = route.data.hasAuthority;
    const hasAnyAuthority: string[] = route.data.hasAnyAuthority;
    const hasAllAuthority: string[] = route.data.hasAllAuthority;

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['home']);
      return false;
    }

    let permission = false;

    if (isAuthenticated) {
      permission = this.handlerisAuthenticated(isAuthenticated);
    }

    if (hasAuthority) {
      permission = this.handlerHasAuthority(hasAuthority);
    }

    if (hasAnyAuthority) {
      permission = this.handlerHasAnyAuthority(hasAnyAuthority);
    }

    if (hasAllAuthority) {
      permission = this.handlerHasAllAuthority(hasAllAuthority);
    }

    if (!permission) {
      this.router.navigate(['acesso_negado']);
      return false;
    }

    return permission;
  }

  handlerisAuthenticated(isAuthenticated: boolean): boolean {
    return this.auth.isAuthenticated() === isAuthenticated;
  }

  handlerHasAuthority(authority: string): boolean {
    if (this.hasAuthority(authority)) {
      return true;
    }
    return false;
  }

  handlerHasAnyAuthority(authorities: string[]): boolean {
    for (const a of authorities) {
      if (this.hasAuthority(a)) {
        return true;
      }
    }
    return false;
  }

  handlerHasAllAuthority(authorities: string[]): boolean {
    for (const a of authorities) {
      if (!this.hasAuthority(a)) {
        return false;
      }
    }
    return true;
  }

  hasAuthority(authority: string) {
    if (!this.auth.isAuthenticated()) {
      return false;
    }
    return this.auth.hasAuthority(authority);
  }

}
