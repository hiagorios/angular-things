import { Directive, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPrint]'
})
export class PrintDirective {

  @Input() printSectionId: string;
  @Input() pageOrientation: 'portrait' | 'landscape';

  constructor(private renderer: Renderer2) { }

  @HostListener('click')
  public print(): void {
    if (this.printSectionId && document.getElementById(this.printSectionId)) {

      const head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('style');

      if (this.pageOrientation && this.pageOrientation === 'landscape') {
        const css = `@page { size: landscape; }`;
        style.media = 'print';
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
      }

      const page = document.getElementById(this.printSectionId)!.cloneNode(true);
      this.renderer.addClass(page, 'printing-page');
      const body = document.getElementsByTagName('body')[0];
      this.renderer.appendChild(body, page);
      window.print();
      this.renderer.removeChild(body, page);

      if (this.pageOrientation && this.pageOrientation === 'landscape') {
        head.removeChild(style);
      }
    } else {
      console.error('PrintSectionId is not set or element was not found');
    }
  }
}
