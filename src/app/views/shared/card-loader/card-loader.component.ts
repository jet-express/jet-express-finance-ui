import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'card-loader',
  template: `
  <div class="loader">
    <i class="fa fa-spinner fa-spin"></i>
  </div>
    `,
  styleUrls: ['./card-loader.component.scss']
})
export class CardLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
