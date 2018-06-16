import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMove]'
})
export class MoveDirective {

  constructor(el: ElementRef) {

    document.addEventListener('wheel', (e) => {
      if (e.deltaY > 0) {
        el.nativeElement.style.translateX = "-10px";
        console.log("up");
      } else {
        el.nativeElement.style.translateX = "10px";
        console.log("down");
      }
    })
  }
}

