import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appEllipsis]'
})
export class EllipsisDirective {

  @HostBinding('class')
  className = 'ellipsisd';


  constructor(el: ElementRef) {
    // console.log(el);
    // console.log(el.nativeElement.offsetHeight);
    // console.log(el.nativeElement.style.lineHeight);
  }

}
