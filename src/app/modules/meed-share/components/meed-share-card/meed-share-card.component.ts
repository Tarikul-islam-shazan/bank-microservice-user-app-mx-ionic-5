import { Component, Input } from '@angular/core';

@Component({
  selector: 'meed-share-card',
  templateUrl: './meed-share-card.component.html',
  styleUrls: ['./meed-share-card.component.scss']
})
export class MeedShareCardComponent {
  @Input() title: string;
  @Input() value: number;
  @Input() image: string;
  @Input() serial: number;

  valueCheck(serial, value) {
    if (serial !== '1') {
      if (value) {
        if (value !== '0') {
          return '$' + value;
        }
        return 0;
      }
      return 0;
    } else {
      if (value) {
        return value;
      }
      return 0;
    }
  }
}
