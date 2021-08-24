import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class CardsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
