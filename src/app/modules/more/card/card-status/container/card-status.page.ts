import { Component, OnInit } from '@angular/core';
import { CardStatusFacade } from '../facade';
import { ICardParams, CardStatus } from '@app/core';

@Component({
  selector: 'app-card-status',
  templateUrl: './card-status.page.html',
  styleUrls: ['./card-status.page.scss']
})
export class CardStatusPage implements OnInit {
  isCardFreeze: boolean;
  constructor(public cardStatusFacade: CardStatusFacade) {}

  ngOnInit(): void {
    this.isCardFreeze = false;
    this.cardStatusFacade.getCardDetails();
  }

  updateCardStatus(cardId, cardStatus): void {
    const params: ICardParams = {
      cardId,
      state: cardStatus ? CardStatus.Locked : CardStatus.Unlockd
    };
    this.cardStatusFacade.updateCardStatus(params);
  }
}
