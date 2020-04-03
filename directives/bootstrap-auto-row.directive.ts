import { Directive, Input, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[bootstrapAutoRow]'
})
export class BootstrapAutoRowDirective implements OnInit {

  @Input() index: number; // zero-based (from *ngFor)
  @Input() colsPerRow: number; // quantity of columns inside each row
  @Input() rowClass: string; // extra css classes that will be aplied to created row

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const colElement = this.el.nativeElement;
    const parentElement = colElement.parentElement;
    if (this.index % this.colsPerRow === 0) {
      // insert new row around this col
      const newRowElement = this.renderer.createElement('div');
      this.renderer.addClass(newRowElement, 'row');
      if (this.rowClass) {
        // adding aditional classes
        this.rowClass.split(' ').forEach(cssClass => {
          this.renderer.addClass(newRowElement, cssClass);
        });
      }
      // inserting the new row before current col
      this.renderer.insertBefore(parentElement, newRowElement, colElement);
      this.renderer.appendChild(newRowElement, colElement);

    } else {
      // wrap this col into above row
      const previousRowElement = colElement.previousElementSibling; // or previousSibling (test)
      this.renderer.appendChild(previousRowElement, colElement);
    }
  }

}
