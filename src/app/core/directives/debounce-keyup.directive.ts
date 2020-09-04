import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceKeyup]'
})
export class DebounceKeyupDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 500;
  @Output() afterDebounce = new EventEmitter();
  private keyup = new Subject();
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.keyup.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(e => this.afterDebounce.emit(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event) {
    event.preventDefault();
    event.stopPropagation();
    this.keyup.next(event);
  }
}
