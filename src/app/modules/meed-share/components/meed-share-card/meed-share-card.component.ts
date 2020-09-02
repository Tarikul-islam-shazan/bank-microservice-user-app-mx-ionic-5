import { Component, Input } from '@angular/core';
import { ValueType } from '@app/core/models/dto/share';

@Component({
  selector: 'meed-share-card',
  templateUrl: './meed-share-card.component.html',
  styleUrls: ['./meed-share-card.component.scss']
})
export class MeedShareCardComponent {
  @Input() title: string;
  @Input() value: number;
  @Input() image: string;
  @Input() type: ValueType;

  get valueType(): typeof ValueType {
    return ValueType;
  }
}
