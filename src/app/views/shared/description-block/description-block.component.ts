import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'description-block',
  templateUrl: './description-block.component.html',
  styleUrls: ['./description-block.component.scss']
})
export class DescriptionBlockComponent implements OnInit {
  @Input() label: string;
  @Input() value: string | Date;
  @Input() type: string | 'date' | 'datetime';

  constructor() { }

  ngOnInit() {
    switch (this.type) {
      case 'date': {
        this.value = moment(this.value).add('hour', 7).format('DD MMM YYYY');
      }
      case 'datetime': {
        this.value = moment(this.value).add('hour', 7).format('DD MMM YYYY, HH:mm');
      }
    }
  }

}
