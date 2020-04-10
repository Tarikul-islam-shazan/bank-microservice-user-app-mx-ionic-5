import { Component } from '@angular/core';
import { CardLostFacade } from '../facade';

@Component({
  selector: 'app-card-lost',
  templateUrl: './card-lost.page.html',
  styleUrls: ['./card-lost.page.scss']
})
export class CardLostPage {
  constructor(public cardLostFacade: CardLostFacade) {}
}
