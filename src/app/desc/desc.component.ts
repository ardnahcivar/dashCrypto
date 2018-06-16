import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-desc',
  templateUrl: './desc.component.html',
  styleUrls: ['./desc.component.scss']
})
export class DescComponent implements OnInit {

  @Input() desc;
  constructor() { }

  ngOnInit() {
  }

}
