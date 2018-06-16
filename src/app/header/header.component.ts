import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
let speed: any = 150;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('moveon', [
      // state('no', style({})),
      state('left', style({ transform: 'translateX(' + "{{speed}}" + 'px)' }), { params: { speed: speed } }),
      state('right', style({ transform: 'translateX(' + "-{{speed}}" + 'px)' }), { params: { speed: speed } }),
      state('left_1', style({ transform: 'translateX(50px)' })),
      state('left_2', style({ transform: 'translateX(50px)' })),
      // transition('no => left', style({})),
      transition('left <=> right', animate(1000))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  private movit: any = false;
  constructor() {

    document.addEventListener('wheel', (e) => {
      if (e.deltaY > 0) {
        // el.nativeElement.style.translateX = "-10px";
        // console.log("up");
        this.movit = false;
        speed -= 50;
        console.log(speed);
      } else {
        // el.nativeElement.style.translateX = "10px";
        this.movit = true;
        // console.log("down");
        speed += 50;
        console.log(speed);
      }
    })
  }

  moveOn() {
    this.movit = !this.movit;
  }

  ngOnInit() {
  }

}
