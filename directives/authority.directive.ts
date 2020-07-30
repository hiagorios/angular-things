import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { AuthorityGuardService } from 'src/app/core/services/authority-guard.service';

@Directive({
  selector: '[hasAuthority], [hasAnyAuthority], [isAuthenticated], [hasAllAuthority]'
})
export class AuthorityDirective implements OnInit, OnDestroy {

  private permissao: boolean;
  private isHidden = true;
  private verifyCriteria: Criteria;
  private destroyed$ = new Subject();
  private val: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authorityGuardService: AuthorityGuardService,
    private authService: AutenticacaoService
  ) { }

  ngOnInit() {
    this.authService.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe(res => {
      this.check();
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  check() {
    switch (this.verifyCriteria) {
      case 'hasAuthority':
        this.permissao = this.authorityGuardService.handlerHasAuthority(this.val);
        this.updateView();
        break;
      case 'hasAnyAuthority':
        this.permissao = this.authorityGuardService.handlerHasAnyAuthority(this.val);
        this.updateView();
        break;
      case 'isAuthenticated':
        this.permissao = this.authorityGuardService.handlerisAuthenticated(this.val);
        this.updateView();
        break;
      case 'hasAllAuthority':
        this.permissao = this.authorityGuardService.handlerHasAllAuthority(this.val);
        this.updateView();
        break;
    }
  }

  @Input()
  set hasAuthority(val: string) {
    this.val = val;
    this.verifyCriteria = 'hasAuthority';
    this.permissao = this.authorityGuardService.handlerHasAuthority(val);
    this.updateView();
  }

  @Input()
  set hasAnyAuthority(val: string[]) {
    this.val = val;
    this.verifyCriteria = 'hasAnyAuthority';
    this.permissao = this.authorityGuardService.handlerHasAnyAuthority(val);
    this.updateView();
  }

  @Input()
  set isAuthenticated(val: boolean) {
    this.val = val;
    this.verifyCriteria = 'isAuthenticated';
    this.permissao = this.authorityGuardService.handlerisAuthenticated(val);
    this.updateView();
  }

  @Input()
  set hasAllAuthority(val: string[]) {
    this.val = val;
    this.verifyCriteria = 'hasAllAuthority';
    this.permissao = this.authorityGuardService.handlerHasAllAuthority(val);
    this.updateView();
  }

  private updateView() {
    if (this.permissao) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

}

type Criteria = 'hasAuthority' | 'hasAnyAuthority' | 'isAuthenticated' | 'hasAllAuthority';
