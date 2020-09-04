import { ValidationMessages } from './../validation/validation-messages';
import { Directive, Input, HostListener, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appFormControlValidationMsg]'
})
export class FormControlValidationMsgDirective implements OnInit, OnDestroy {

  // Based on srikanthmadasu's directive with same name
  // This directive uses Bulma css classes to change the form control's appearance

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private control: NgControl
  ) { }

  @Input() propertyId: string;
  @Input() isSelect: boolean;
  errorSpanId = '';

  statusChangeSubscription: Subscription;

  ngOnInit(): void {
    this.errorSpanId = this.propertyId + new Date() + '-error-msg';
    this.statusChangeSubscription = this.control.statusChanges.subscribe(
      (status) => {
        if (status == 'INVALID') {
          this.showError();
        } else {
          this.removeError();
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.statusChangeSubscription.unsubscribe();
  }

  @HostListener('blur', ['$event'])
  handleBlurEvent(event) {
    // This is needed to handle the case of clicking a required field and moving out.
    // Rest all are handled by status change subscription
    if (this.control.value == null || this.control.value == '') {
      if (this.control.errors) { this.showError(); }
      else { this.removeError(); }
    }
  }

  private showError() {
    this.removeError();
    this.renderer.addClass(this.elRef.nativeElement, 'is-danger');
    const valErrors: ValidationErrors = this.control.errors;
    const firstKey = Object.keys(valErrors)[0];
    const errorMsgKey = this.propertyId + '-' + (firstKey === 'blankString' ? 'required' : firstKey);
    const errorMsg = ValidationMessages[errorMsgKey];
    const errSpan = '<p class="help is-danger" id="' + this.errorSpanId + '">' + errorMsg + '</p>';
    this.elRef.nativeElement.parentElement.insertAdjacentHTML(this.isSelect ? 'afterend' : 'beforeend', errSpan);
  }

  private removeError(): void {
    this.renderer.removeClass(this.elRef.nativeElement, 'is-danger');
    const errorElement = document.getElementById(this.errorSpanId);
    if (errorElement) { errorElement.remove(); }
  }

}
