import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDotdotdot]'
})
export class DotdotdotDirective implements OnInit {

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    let hostElem = this.elRef.nativeElement;

    // style="white-space: nowrap; overflow: hidden;"
    this.renderer.setStyle(hostElem.parentElement, 'white-space', 'nowrap');
    this.renderer.setStyle(hostElem.parentElement, 'overflow', 'hidden');

    // style="overflow: hidden; text-overflow: ellipsis;"
    this.renderer.setStyle(hostElem, 'overflow', 'hidden');
    this.renderer.setStyle(hostElem, 'text-overflow', 'ellipsis');

  }
}
