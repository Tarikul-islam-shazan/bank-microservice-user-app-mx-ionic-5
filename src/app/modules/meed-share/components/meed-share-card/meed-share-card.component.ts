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
  @Input() valueType: string;
}
