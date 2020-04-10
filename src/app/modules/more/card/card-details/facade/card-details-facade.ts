import { Injectable } from '@angular/core';
import { CardService, ICard } from '@app/core';
import { Observable } from 'rxjs';

@Injectable()
export class CardDetailsFacade {
  cards$: Observable<ICard[]>;
  constructor(private cardService: CardService) {
    this.getCardDetails();
  }

  getCardDetails(): void {
    this.cards$ = this.cardService.cardDetails;
  }
}
