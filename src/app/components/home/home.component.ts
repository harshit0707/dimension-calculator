import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('elementAnimation', [
      state('initial', style({
        transform: 'translateY(10%)', opacity: 0
      })),
      state('final', style({
        transform: 'translateY(0%)', opacity: 1
      })),
      transition('initial => final', [
        animate('1s ease-in-out')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  inFocus: boolean;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.inFocus = true;
    }, 100)
  }

}
