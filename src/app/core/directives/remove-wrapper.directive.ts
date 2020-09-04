import { Directive, ElementRef, Input } from '@angular/core';

// From https://stackoverflow.com/questions/58680705/css-bootstrap-not-working-in-angular-sub-component
@Directive({
  selector: '[remove-wrapper]'
})

export class RemoveWrapperDirective {
  @Input() mode: string;
  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    if (this.mode === 'host') {
      this.host();
    } else {
      this.wrapper();
    }
  }

  wrapper() {
    const parentElement = this.el.nativeElement.parentElement;
    const element = this.el.nativeElement;
    parentElement.removeChild(element);
    if (parentElement.parentNode) {
      parentElement.parentNode.insertBefore(element, parentElement.nextSibling);
      parentElement.parentNode.removeChild(parentElement);
    }
  }

  host() {
    const element = this.el.nativeElement;
    const parentElement = element.parentElement;
    // move all children out of the element
    while (element.firstChild) {
      parentElement.insertBefore(element.firstChild, element);
    }
    // remove the empty element(the host)
    parentElement.removeChild(element);
  }
}
